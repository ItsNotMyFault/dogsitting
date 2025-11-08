function validNumber(value: any): number | boolean {
  return value === undefined || value === null || value === "" || isNaN(value) ? false : true;
}

function formatNumber(
  value: number | null | undefined,
  {
    style = "decimal",
    currency = "USD",
    compact = false, //compact 23000 => 23k
    locale = "fr-FR"
  }: {
    style?: "decimal" | "currency";
    currency?: string;
    compact?: boolean;
    locale?: string;
  } = {}
): string {
  if (value == null) return "";

  return new Intl.NumberFormat(locale, {
    style,
    currency: style === "currency" ? currency : undefined,
    notation: compact ? "compact" : "standard",
    compactDisplay: "short",
    minimumFractionDigits: compact ? 0 : 2,
    maximumFractionDigits: compact ? 0 : 2
  }).format(value);
}

/**
 * Removes whitespaces from a string and converts to number.
 * @param numberValue
 * @returns
 */
function toNumber(numberValue: string) {
  if (numberValue && typeof numberValue === "string") {
    return Number(numberValue.replace(/\s/g, ""));
  } else if (typeof numberValue === "number") {
    return numberValue;
  }
  return;
}

export { formatNumber, toNumber, validNumber };
