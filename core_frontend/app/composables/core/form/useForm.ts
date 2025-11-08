import type {
  FormConfig,
  FormSchema,
  FormSubmit,
  Schema
} from "#core/types/form/FormType";
import type { FormError, FormErrorEvent } from "#ui/types";
import { computed, ref, type Reactive } from "vue";

export interface FormErrorType {
  message: string;
  name: string;
  path?: string;
}

export function useForm<T extends object>(config: FormConfig<T>) {
  const formData = reactive<T>(structuredClone(config.initialData));
  const formSchema = { ...config.schema };
  const formErrors = ref<FormError[]>([
    {
      message: "Error set on default before the form is validated.", //this error is there to avoid the form being set as valid without the first validation.
      name: "Initialization error"
    }
  ]);
  const hasErrors = computed(() => formErrors.value.length > 0);
  const loading = ref(false);
  const isSubmitting = ref(false);
  const hasClickedSubmit = ref<boolean>(false);

  const submitForm = async (event: FormSubmit) => {
    if (isSubmitting.value) {
      return;
    }

    isSubmitting.value = true;
    try {
      const errors = initialValidateForm();

      if (errors.length == 0) {
        if (config?.emit) {
          config.emit("submit", {
            formData
          });
        }
        if (event.onSubmit) {
          await event.onSubmit(formData);
        }
      } else if (event?.onInvalid) {
        event.onInvalid?.(Object.values(formErrors.value).flat());
      }
    } catch (e) {
      console.error(e);
    } finally {
      isSubmitting.value = false;
      setLoading(false);
    }
  };

  const initialValidateForm = () => {
    hasClickedSubmit.value = true;
    const errors = validateForm(formData, formSchema);
    formErrors.value = errors; // important pour l'extérieur (custom tab errors, etc.)
    console.debug("initialValidateForm errors", errors);
    return errors;
  };

  const validateForm = (
    data: Reactive<T> = formData,
    schema: FormSchema<T> = formSchema,
    parentKey = ""
  ): FormErrorType[] => {
    const errors: FormErrorType[] = [];

    Object.entries(schema).forEach(([fieldKey, fieldSchema]) => {
      const fullDataKey = parentKey ? `${parentKey}.${fieldKey}` : fieldKey;
      const fieldValue = getNestedValue(data, fullDataKey);
      // Handle nested object validation
      if (fieldSchema.type === "object" && !isEmpty(fieldSchema.schema)) {
        const nestedErrors = validateForm(data, fieldSchema.schema, fullDataKey);
        errors.push(...nestedErrors);

        // Validate object-level rules if they exist
        if (fieldSchema.rules?.length) {
          errors.push(...validateField(fieldValue, fieldSchema, fullDataKey));
        }
        return;
      }

      // Handle array validation
      if (fieldSchema.type === "array" && !isEmpty(fieldSchema.schema)) {
        // If value is undefined/null/empty, treat as empty list and (optionally) validate array-level rules
        if (isEmpty(fieldValue)) {
          // If you want array-level rules (e.g., required, min length) to run on empty:
          if (fieldSchema.rules?.length) {
            errors.push(...validateField(fieldValue, fieldSchema, fullDataKey));
          }
          return;
        }

        // Normalize to an array:
        const fieldValueAsArray = Array.isArray(fieldValue)
          ? fieldValue
          : typeof fieldValue === "object" && fieldValue !== null
            ? Object.values(fieldValue as Record<string, unknown>)
            : [];
        console.log("fieldValueAsArray", fieldValueAsArray);
        // Validate each item in the array
        fieldValueAsArray.forEach((item, index) => {
          if (typeof item === "object" && item !== null && fieldSchema.schema) {
            const itemKey = `${fullDataKey}[${index}]`;

            // Validate each field of the array item *IMPORTANT*
            Object.entries(fieldSchema.schema).forEach(([subKey, subSchema]) => {
              const subFieldKey = `${itemKey}.${subKey}`;
              if (
                subSchema.type === "object" ||
                (subSchema.type === "array" && !isEmpty(subSchema.schema))
              ) {
                const deepErrors = validateForm(data, { [subKey]: subSchema }, itemKey);
                errors.push(...deepErrors);
              } else {
                errors.push(
                  ...validateField(item[subKey], subSchema, subFieldKey, fieldValueAsArray)
                );
              }
            });
          }
        });

        // Validate array-level rules if they exist *IMPORTANT*
        if (fieldSchema.rules?.length) {
          errors.push(...validateField(fieldValue, fieldSchema, fullDataKey));
        }
        return;
      }

      // Handle simple field validation
      errors.push(...validateField(fieldValue, fieldSchema, fullDataKey));
    });

    return errors;
  };

  /**
   * @param value field's value to be validated
   * @param fieldSchema field's schema to be used
   * @param key must be the valid formData key path.
   * @param siblingRows
   * @returns
   */
  const validateField = (
    value: any,
    fieldSchema: Schema<T>,
    key: string,
    siblingRows: any[] = []
  ) => {
    const errors: FormErrorType[] = [];
    if (Array.isArray(fieldSchema?.rules) && fieldSchema?.rules?.length > 0) {
      for (const rule of fieldSchema.rules) {
        const result = rule(value, siblingRows, formData, key);
        if (typeof result === "string") {
          errors.push({
            path: key,
            name: key,
            message: result
          });
          break;
        }
      }
    } else if (fieldSchema.required) {
      const errorMessage = requiredField(value, fieldSchema.label);
      if (typeof errorMessage === "string") {
        errors.push({
          path: key,
          name: key,
          message: errorMessage
        });
      }
    }
    return errors;
  };

  const requiredField = (v: any, fieldName?: string) => {
    if (config.translate) {
      return !isEmpty(v) || config.translate("core.validation.required");
    }

    return !isEmpty(v) || `${fieldName} is required`;
  };

  const onFormError = async (event: FormErrorEvent) => {
    const foundError = event.errors.find((x) => !isEmpty(x?.id));
    if (foundError) {
      const element = document.getElementById(foundError?.id ?? "");
      element?.focus();
      element?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const setLoading = (value: boolean) => (loading.value = value);

  return {
    loading,
    hasClickedSubmit,
    formData,
    formErrors,
    hasErrors,
    submitForm,
    initialValidateForm,
    onFormError,
    setLoading,
    isSubmitting
  };
}
