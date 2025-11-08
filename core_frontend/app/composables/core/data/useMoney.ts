import { computed } from "vue";

export const useMoney = ({
  minimumFractionDigits = 2,
  maximumFractionDigits = 2,
  currency = "USD",
  locale = "us-EN"
} = {}) => {
  const formatCache = new Map();

  /**
   * Format a number into currency or decimal style
   * @param amount Number to format
   * @param options Extra formatting options
   */
  const formatMoney = (
    amount: number,
    options: {
      isCurrency?: boolean;
      forceNegativeNumber?: boolean;
      showNegativeInParens?: boolean;
      allowNegative?: boolean;
    } = {
      isCurrency: true,
      forceNegativeNumber: false,
      showNegativeInParens: true,
      allowNegative: true
    }
  ): string => {
    const { isCurrency, showNegativeInParens, forceNegativeNumber, allowNegative } = options;

    const absAmount = Math.abs(amount);
    const cacheKey = `${absAmount}-${currency}-${locale}-${isCurrency}-${showNegativeInParens}-${allowNegative}`;

    if (formatCache.has(cacheKey)) {
      return formatCache.get(cacheKey);
    }

    const formatter = new Intl.NumberFormat(locale, {
      style: isCurrency ? "currency" : "decimal",
      currency,
      minimumFractionDigits,
      maximumFractionDigits
    });

    let formatted: string;

    if (!validNumber(amount)) {
      formatted = formatter.format(0);
    } else {
      formatted = formatter.format(allowNegative ? amount : absAmount);
    }

    if (((amount < 0 && allowNegative) || forceNegativeNumber) && amount !== 0) {
      formatted = showNegativeInParens
        ? `(${formatter.format(absAmount)})`
        : `-${formatter.format(absAmount)}`;
    }

    formatCache.set(cacheKey, formatted);
    return formatted;
  };

  const parseCurrency = (formattedValue: string) => {
    const numericString = formattedValue.replace(/[^0-9.-]/g, "");
    const parsedValue = parseFloat(numericString) || 0;

    const factor = Math.pow(10, maximumFractionDigits);
    const rounded = Math.round(parsedValue * factor) / factor;
    return Number(rounded.toFixed(minimumFractionDigits));
  };

  const createFormattedMoneyComputed = (amountRef: any) => {
    return computed(() => formatMoney(amountRef.value));
  };

  return {
    formatMoney,
    parseCurrency,
    createFormattedMoneyComputed
  };
};
