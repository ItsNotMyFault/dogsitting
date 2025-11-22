import type { DateTime } from "luxon";
import { useCountry } from "./useCountry";

type DateInput = string | number | Date | DateTime | null | undefined;
const toDate = (v: DateInput): Date | null => {
  if (v === null || v === undefined) {
    return null;
  }
  if (v instanceof Date) {
    return v;
  }
  // Handle Luxon DateTime objects
  if (typeof v === "object" && v && "toJSDate" in v) {
    return (v as DateTime).toJSDate();
  }
  return new Date(v);
};

export function useDateFormat() {
  const { locale } = useI18n();
  const { country } = useCountry();

  const fullLocale = computed(() => `${locale.value}-${country.value}`);
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  function formatCalendarDate(
    input: DateInput,
    style: "short" | "medium" | "long" | "full" = "short",
    fallback: string = "—"
  ): string {
    const date = toDate(input);
    if (date === null) {
      return fallback;
    }
    // TODO: replace locale.value with fullLocale.value when calendar supports it
    return new Intl.DateTimeFormat(locale.value, { timeZone: "UTC", dateStyle: style }).format(
      date
    );
  }

  function formatDateWithTimezone(
    input: DateInput,
    style: "short" | "medium" | "long" | "full" = "short",
    fallback: string = "—"
  ): string {
    const date = toDate(input);
    if (date === null) {
      return fallback;
    }
    // TODO: replace locale.value with fullLocale.value when calendar supports it
    return new Intl.DateTimeFormat(locale.value, { timeZone, dateStyle: style }).format(date);
  }

  function formatDateTimeWithTimezone(
    input: DateInput,
    style: "short" | "medium" | "long" | "full" = "short",
    fallback: string = "—"
  ): string {
    const date = toDate(input);
    if (date === null) {
      return fallback;
    }
    // TODO: replace locale.value with fullLocale.value when calendar supports it
    return new Intl.DateTimeFormat(locale.value, {
      timeZone,
      dateStyle: style,
      timeStyle: style
    }).format(date);
  }

  return { formatDateWithTimezone, formatDateTimeWithTimezone, formatCalendarDate, fullLocale };
}
