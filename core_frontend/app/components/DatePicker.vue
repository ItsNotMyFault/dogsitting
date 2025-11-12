<template>
  <UPopover v-model:open="open" :style="{ width: width }" @update:open="(v) => busFocus(v)">
    <UFieldGroup class="w-full" size="md">
      <UButton :id="id" class="w-full cursor-pointer" :class="{
        'text-red-500 ring-red-500 ring-1': error
      }" :disabled="disabled" variant="outline" icon="lucide:calendar-days" :label="formattedDate" />

      <UButton v-if="isDateTimeValid(localLuxonDate)" color="error" variant="subtle" icon="lucide:x" @click="clear" />
    </UFieldGroup>
    <!-- this HIDDEN input is used to create a fake focus input when scrolling to error -->
    <UInput :id="id" class="hidden" :name="id" />
    <template #content>
      <DatePicker :id="id" v-model="localDate" :name="id" :mode="dateTime ? 'dateTime' : 'date'" :min-date="minDate"
        :is24hr="true" @update:model-value="updateDate($event)" />
    </template>
  </UPopover>
</template>

<script setup lang="ts">
import { formBusInjectionKey } from "#ui/composables/useFormField";
import type { DateTime } from "luxon";
import { DatePicker } from "v-calendar";
import "v-calendar/dist/style.css";
import type { PropType } from "vue";
import { useDateFormat } from "@/composables/useDateFormat";
import {
  convertToDateTime,
  isDateTimeValid,
  type DateStringFormat
} from "@/utils/dateAndTime";

const { formatDateWithTimezone, formatDateTimeWithTimezone } = useDateFormat();
const bus = inject(formBusInjectionKey)!;

const props = defineProps({
  modelValue: {
    type: [Date, Object, String] as PropType<Date | DateTime | string | null>,
    default: null
  },
  dateTime: {
    type: Boolean,
    default: false
  },
  minDate: {
    type: Date,
    default: null
  },
  disabled: Boolean,
  icon: Boolean,
  width: {
    type: String,
    default: "w-full"
  },
  /**
   * @var modelFormat If modelFormat is true, the emitted modelValue will be converted to date ISO string, will be default to ISO string.
   * modelFormat can also be a formatted string type. This will be the emitted value type.
   * The shown datepicker value is always determined via user's internationalization settings.
   */
  modelFormat: {
    type: [Boolean, String] as PropType<boolean | DateStringFormat>,
    default: true
  },
  /**
   * important prop for validation purposes.
   * @var id
   */
  id: String,
  placeholder: String,
  /**
   * Error message must be passed manually because the datepicker isn't a nuxtui field.
   * @var error
   */
  error: {
    type: String,
    default: null
  }
});

const emit = defineEmits<{
  (e: "update:model-value", value: DateTime | string | undefined): void;
  (e: "change" | "input"): void;
}>();

const clear = () => {
  localDate.value = undefined;
  localLuxonDate.value = undefined;
  emit("update:model-value", localDate.value);
  emitDateChange(true);
};

const dateMenu = ref<boolean | undefined>(false);
const localDate = ref<Date | undefined>();
const localLuxonDate = ref<DateTime | undefined>();
// const localDate = ref<DateTime>();
const open = ref<boolean>(false);
const { t } = useI18n();

const formattedDate = computed(() => {
  if (isDateTimeValid(localLuxonDate.value)) {
    if (props.dateTime) {
      return formatDateTimeWithTimezone(localLuxonDate.value);
    }
    return formatDateWithTimezone(localLuxonDate.value);
  }
  return props.placeholder ?? t("core.label.select-date");
});

const busFocus = (isOpen: boolean) => {
  if (!bus || !props.id) return;
  bus.emit({ type: isOpen ? "focus" : "blur", name: props.id as any });
};

const updateDate = (date: Date) => {
  dateMenu.value = false;

  let dateToEmit: DateTime | string | undefined;
  localLuxonDate.value = convertToDateTime(date);
  if (!isEmpty(props.modelFormat)) {
    if (props.modelFormat === true) {
      if (props.dateTime) {
        dateToEmit =
          convertToDateTime(date)?.toISO({ suppressSeconds: true, suppressMilliseconds: true }) ??
          undefined;
      } else {
        dateToEmit = convertToDateTime(date)?.toISODate() ?? undefined;
      }
    } else if (typeof props.modelFormat === "string") {
      dateToEmit = convertToDateTime(date)?.toFormat(props.modelFormat);
    }
  } else {
    dateToEmit = convertToDateTime(date);
  }

  if (dateToEmit) {
    emit("update:model-value", dateToEmit);

    emitDateChange(!props.dateTime);
  }
};

const emitDateChange = async (close: boolean = true) => {
  emit("change");
  bus?.emit({ type: "input", name: props.id as any, eager: true });
  bus?.emit({ type: "change", name: props.id as any });
  if (close) {
    open.value = false;
  }
};

watch(
  () => props.modelValue,
  (newValue: any) => {
    if (newValue) {
      localLuxonDate.value = convertToDateTime(newValue);
      localDate.value = localLuxonDate.value?.toJSDate() ?? undefined;
    } else {
      clear();
    }
  },
  { deep: true }
);

onMounted(() => {
  if (props.modelValue) {
    localLuxonDate.value = convertToDateTime(props.modelValue);
    localDate.value = localLuxonDate.value?.toJSDate() ?? undefined;
  } else {
    localLuxonDate.value = undefined;
    localDate.value = undefined;
  }
});
</script>
