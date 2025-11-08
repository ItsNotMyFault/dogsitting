// Define the available date format types
export type DateFormatType = "date" | "datetime" | "time" | "sqlDatetime" | "sqlDatetimeSeconds";

// Map of format types to their format strings
export const DATE_FORMAT_TYPES: Record<DateFormatType, string> = {
  date: "d MMM yyyy", // 1 Jan 2023
  datetime: "d MMM yyyy HH:mm", // 1 Jan 2023 14:30
  time: "HH:mm", // 14:30
  sqlDatetime: "yyyy-MM-dd HH:mm", // 2023-01-01 14:30
  sqlDatetimeSeconds: "yyyy-MM-dd HH:mm:ss" // 2023-01-01 14:30:00
};
