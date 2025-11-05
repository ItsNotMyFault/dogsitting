import type { SelectOption } from "#core/core/SelectOptionType";
import type { Reactive } from "vue";

type SchemaRule<T> = (
  /**
   * The current value of the formData.
   */
  v: any,
  /**
   * sibling rows of formdata values.
   */
  rows?: Record<string, any>,
  /**
   * The current formData with all other fields with their values.
   */
  formData?: T | Reactive<T>,
  /**
   * important to allow formbuilder to depend in between rows.
   * 'custom rules'
   */
  key?: string
) => boolean | string;

type FormSchema<T extends object> = Record<string, Schema<T>>;

type InputType =
  | "object"
  | "file"
  | "text"
  | "textarea"
  | "number"
  | "select"
  | "checkbox"
  | "date"
  | "badge"
  | "array"
  | "password"
  | "phoneNumber";
type SchemaType = "object" | "basic" | "array";

interface Schema<T> {
  /**
   * Needs to match key definition in FormSchema.
   */
  label: string;
  /**
   * If is of type object, add a schema definition
   */
  type: SchemaType;
  /**
   * Required if you want to use this formSchema in the generic form.
   */
  inputType?: InputType;
  required?: boolean;
  isArray?: boolean;
  validation?: FormFieldValidation;
  /**
   * Used when type is set to "object"
   */
  schema?: FormSchema<any>; //child schema can be any other type.
  rules?: SchemaRule<T>[];
  placeholder?: string;
  options?: SelectOption[];
  dateFormat?: string;
  class?: string;
  clearable?: boolean;
}

interface FormFieldValidation {
  required?: boolean;
  disabled?: boolean;
  hideChildren?: boolean;
  min?: number;
  max?: number;
  label: string;
  pattern?: RegExp;
}

interface FormConfig<T extends object> {
  initialData: T;
  schema: FormSchema<T>;
  emit?: (event: "saved" | "submit", ...args: any[]) => void;
  translate?: any;
}

interface FormSubmit {
  onSubmit: any;
  onInvalid: any;
}
type FormType<T> = {
  [K in keyof T]: Schema<T>;
};

interface FormInstance {
  clear: (path?: string) => void;
  getErrors: () => any[];
  setErrors: (errors: any[]) => void;
}

export type { FormConfig, FormInstance, FormSchema, FormSubmit, FormType, Schema, SchemaRule };
