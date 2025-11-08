import type { SelectOption } from "#core/types/core/SelectOptionType";

export const useEnumOptions = <T extends string>(
  enumObj: Record<string, T>,
  translationNamespace?: string,
  colorMap?: Record<T, string>
): SelectOption[] => {
  // TODO find a way to use i18n to dynamically translate. the composable of i18n must be usable everywhere.
  return Object.values(enumObj).map((value) => ({
    value,
    label: value.replace(/([a-z])([A-Z])/g, "$1 $2"), // no spaces!
    // label: translationNamespace ? t(`${translationNamespace}.${value}`) : value.replace(/([a-z])([A-Z])/g, "$1 $2"), // no spaces!
    color: colorMap?.[value]
  }));
};

/**
 * Helper utilities for working with enum options
 */
export const useEnumUtils = () => {
  /**
   * Get the translated label for an enum value from options array
   */
  const getOptionLabel = (options: SelectOption[], value: string | number): string => {
    const option = options.find((o) => o.value === value);
    return option ? option.label : "—";
  };

  /**
   * Get the color for an enum value from options array
   */
  const getOptionColor = (options: SelectOption[], value: string | number): string => {
    const option = options.find((o) => o.value === value);
    return option && option.color ? option.color : "gray";
  };

  /**
   * Check if an enum option has a color defined
   */
  const hasOptionColor = (options: SelectOption[], value: string | number): boolean => {
    const option = options.find((o) => o.value === value);
    return !!option?.color;
  };

  return {
    getOptionLabel,
    getOptionColor,
    hasOptionColor
  };
};
