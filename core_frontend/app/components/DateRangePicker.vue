<template>
  <UPopover v-model:open="open" :style="{ width: width }">
    <UFieldGroup class="w-full">
      <UButton :id="id" class="w-full cursor-pointer text-sm" :class="{
        'text-red-500 ring-red-500 ring-1': error
      }" :disabled="disabled" variant="outline" icon="lucide:calendar-days" :label="formattedSelectedDate" />
      <UButton v-if="hasDatesSelected" color="error" variant="subtle" icon="lucide:x" @click="clearInput($event)" />
    </UFieldGroup>
    <template #content>
      <div class="flex items-center sm:divide-x divide-gray-200 dark:divide-gray-800 z-max w-auto"
        style="width: max-content">
        <div class="hidden sm:flex flex-col py-4">
          <UButton v-for="(range, index) in ranges" :key="index" :label="range.label" color="secondary" variant="ghost"
            class="rounded-none px-6" :class="[
              isRangeSelected(range.duration)
                ? 'bg-gray-100 dark:bg-gray-800'
                : 'hover:bg-gray-50 dark:hover:bg-gray-800/50'
            ]" truncate @click="selectRange(range.duration)" />
        </div>
        <!-- this HIDDEN input is used to create a fake focus input when scrolling to error -->
        <UInput :id="id" class="hidden" :name="id" />
        <DatePicker :id="id" v-model.range="jsDateRange" :name="id" :mode="dateTime ? 'dateTime' : 'date'"
          :min-date="minDate" :columns="2" @update:model-value="handleDateSelection($event)" />
      </div>
    </template>
  </UPopover>
</template>

<script setup lang="ts">
import { DateTime, Duration } from "luxon";
import { DatePicker } from "v-calendar";
import { useDateFormat } from "@/composables/useDateFormat";
import { isDateTimeValid } from "@/utils/dateAndTime";
import { convertToDateTime } from "@/utils/dateAndTime.js";

interface SelectedDates {
  start?: DateTime | string;
  end?: DateTime | string;
}

const { formatCalendarDate } = useDateFormat();

const props = defineProps({
  modelValue: {
    type: Object as PropType<SelectedDates>,
    required: true
  },

  dateTime: Boolean,
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
    default: false
  },
  /**
   * important prop for validation purposes.
   * @var id
   */
  id: String,
  /**
   * Error message must be passed manually because the datepicker isn't a nuxtui field.
   * @var error
   */
  error: {
    type: String,
    default: null
  }
});

watch(
  () => props.modelValue,
  () => {
    init();
  },
  { deep: true }
);
const ranges = [
  { label: "Last 7 days", duration: Duration.fromObject({ days: 7 }) },
  { label: "Last 14 days", duration: Duration.fromObject({ days: 14 }) },
  { label: "Last 30 days", duration: Duration.fromObject({ days: 30 }) },
  { label: "Last 3 months", duration: Duration.fromObject({ months: 3 }) },
  { label: "Last 6 months", duration: Duration.fromObject({ months: 6 }) },
  { label: "Last year", duration: Duration.fromObject({ years: 1 }) }
];

const emit = defineEmits<{
  (e: "update:modelValue", selectedDates: SelectedDates): void;
  (e: "change"): void;
}>();

const isPopoverOpen = ref(false);
const localSelected = ref<SelectedDates>({
  start: undefined,
  end: undefined
});

function isRangeSelected(duration: Duration) {
  const now = DateTime.now();
  const { start, end } = localSelected.value;
  if (typeof start === "string" || typeof end === "string") return false;
  if (!isDateTimeValid(start) || !isDateTimeValid(end)) return false;
  return start.hasSame(now.minus(duration), "day") && end.hasSame(now, "day");
}
const open = ref<boolean>(false);
const jsDateRange = ref({
  start: new Date(),
  end: new Date()
});

const handleDateSelection = (value: { start: Date; end: Date }) => {
  if (!isEmpty(props.modelFormat)) {
    if (props.modelFormat === true) {
      if (props.dateTime) {
        localSelected.value = {
          start: convertToDateTime(value.start)?.toISO() ?? undefined,
          end: convertToDateTime(value.end)?.toISO() ?? undefined
        };
      } else {
        localSelected.value = {
          start: convertToDateTime(value.start)?.toISODate() ?? undefined,
          end: convertToDateTime(value.end)?.toISODate() ?? undefined
        };
      }
    } else if (typeof props.modelFormat === "string") {
      localSelected.value = {
        start: convertToDateTime(value.start)?.toFormat(props.modelFormat),
        end: convertToDateTime(value.end)?.toFormat(props.modelFormat)
      };
    }
  } else {
    localSelected.value = {
      start: convertToDateTime(value.start),
      end: convertToDateTime(value.end)
    };
  }

  emitChange();
  open.value = false;
};

const formattedSelectedDate = computed(() => {
  if (isDateTimeValid(localSelected.value.start) && isDateTimeValid(localSelected.value.end)) {
    return `${formatCalendarDate(localSelected.value.start.toJSDate())} -
    ${formatCalendarDate(localSelected.value.end.toJSDate())}`;
  }

  return "Veuillez choisir des dates";
});

const emitChange = () => {
  emit("update:modelValue", localSelected.value);
  emit("change");
};

const clearInput = (event: Event) => {
  event.preventDefault();
  event.stopPropagation();
  localSelected.value = {
    start: undefined,
    end: undefined
  };
  emitChange();
};

const hasDatesSelected = computed(() => {
  return !!localSelected.value.start && !!localSelected.value.end;
});

function selectRange(duration: Duration) {
  const now = DateTime.now();
  localSelected.value = {
    start: now.minus(duration),
    end: now
  };

  isPopoverOpen.value = false;
  emitChange();
  open.value = false;
}

const init = () => {
  if (props.modelValue?.start && props.modelValue?.end) {
    localSelected.value = {
      start: convertToDateTime(props.modelValue?.start),
      end: convertToDateTime(props.modelValue?.end)
    };
  } else {
    localSelected.value = {
      start: undefined,
      end: undefined
    };
  }
};

onMounted(() => {
  init();
});
</script>
