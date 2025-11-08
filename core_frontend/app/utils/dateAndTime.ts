import { DateTime } from "luxon";

export type DateStringFormat =
  | "yyyy-MM-dd"
  | "yyyy-MM-dd HH:mm" //sqlDatetime
  | "yyyy-MM-dd HH:mm:ss" //sqlDatetimeSeconds
  | "yyyy-MM-dd'T'HH:mm:ss.SSSZ"
  | "dd-MM-yyyy"
  | "MM/dd/yyyy"
  | "dd/MM/yyyy"
  | "yyyy/MM/dd"
  | "dd.MM.yyyy"
  | "yyyy.MM.dd"
  | "MMMM d, yyyy"
  | "d MMM yyyy" //date
  | "d MMM yyyy HH:mm" //datetime
  | "HH:mm" //time
  | "yyyy MMMM d"
  | "EEE, d MMM yyyy";

export const DATE_FORMATS = [
  "yyyy-MM-dd",
  "yyyy-MM-dd HH:mm", //sqlDatetime
  "yyyy-MM-dd HH:mm:ss", //sqlDatetimeSeconds
  "yyyy-MM-dd'T'HH:mm:ss.SSSZ",
  "dd-MM-yyyy",
  "MM/dd/yyyy",
  "dd/MM/yyyy",
  "yyyy/MM/dd",
  "dd.MM.yyyy",
  "yyyy.MM.dd",
  "MMMM d, yyyy",
  "d MMM yyyy", //date
  "d MMM yyyy HH:mm", //datetime
  "HH:mm", //time
  "yyyy MMMM d",
  "EEE, d MMM yyyy"
] as DateStringFormat[];

/**
 * Converts any date parameter to a luxon DateTime. To be used to manipulate dates.
 * @param date Any date parameter, from type string, Date or luxon DateTime will be converted to luxon DateTime.
 * @returns Undefined or A DateTime object.
 */
const convertToDateTime = (date: string | Date | DateTime): DateTime | undefined => {
  if (DateTime.isDateTime(date)) {
    return date;
  } else if (typeof date === "string") {
    // Try ISO format first (most common)
    const isoDate = DateTime.fromISO(date);
    if (isoDate.isValid) {
      return isoDate;
    }

    // Try other formats
    console.warn("string date format not found, trying other formats");
    for (const format of DATE_FORMATS) {
      const parsed = DateTime.fromFormat(date, format);
      if (parsed.isValid) {
        return parsed;
      }
    }
  } else if (date instanceof Date) {
    return DateTime.fromJSDate(date);
  }
  return undefined;
};

const convertToDateOnly = (date: string | Date | DateTime): Date | undefined => {
  const dateTime = convertToDateTime(date);
  if (dateTime) {
    // Convert to Date and set the time to midnight
    const jsDate = dateTime.startOf("day").toJSDate();
    return jsDate;
  }
  return undefined;
};

const isDateTimeValid = (date: DateTime | null | undefined) => {
  return date !== undefined && date !== null && DateTime.isDateTime(date);
};

function formatJsDateToString(
  date: Date | DateTime | string,
  format: string = "yyyy-MM-dd HH:mm:ss"
) {
  const targetDate = convertToDateTime(date);
  return targetDate?.toFormat(format);
}

function getTodayDate(langCode: string = "fr") {
  const todayDate = DateTime.now().setLocale(langCode);
  return todayDate.toFormat("yyyy-MM-dd");
}

function getTodayDateTime(langCode: string = "fr") {
  const todayDate = DateTime.now().setLocale(langCode);
  return todayDate.toFormat("yyyy-MM-dd HH:mm:ss");
}

function displayTodayDate(locale: string = "fr") {
  const todayDate = DateTime.now();
  return todayDate.toLocaleString(DateTime.DATE_FULL, { locale: locale });
}

function formatDateFromAPI(utcDateString: string) {
  return DateTime.fromISO(utcDateString, { zone: "utc" })
    .toLocal()
    .toFormat("yyyy-MM-dd HH:mm:ss ZZZZ");
}

// Convert a local date to UTC before sending to API
function prepareDateForAPI(localDateString: string) {
  return DateTime.fromISO(localDateString, { zone: "local" })
    .toUTC()
    .toISO({ suppressMilliseconds: true });
}

function daysDiff(startDate: Date | DateTime | string, endDate: Date | DateTime | string): number {
  if (startDate && endDate) {
    const start = convertToDateTime(startDate);
    const end = convertToDateTime(endDate);
    return end.diff(start, "days").days;
  }
  return -1;
}

export {
  convertToDateOnly,
  convertToDateTime,
  DateTime,
  daysDiff,
  displayTodayDate,
  formatDateFromAPI,
  formatJsDateToString,
  getTodayDate,
  getTodayDateTime,
  isDateTimeValid,
  prepareDateForAPI
};
