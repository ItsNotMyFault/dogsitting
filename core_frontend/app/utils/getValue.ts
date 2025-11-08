import type { ComparisonValue } from "#core/types/core/SelectOptionType";

/**
 * Handle array notation by replacing [n] with .n and then splitting by dots
 */
export const getNestedValue = (obj: any, path: string): any => {
  if (!path) return obj;

  const keys = path.split(/[\.\[\]]/).filter(Boolean); // Split by dots and brackets
  let value = obj;

  for (const key of keys) {
    if (value && Object.prototype.hasOwnProperty.call(value, key)) {
      value = value[key];
    } else {
      console.warn(`Path NOT FOUND => ${path}`);
      return undefined; // Path does not exist
    }
  }

  return value;
};

export function setNestedValue(obj: any, path: string, value: any): void {
  const keys = path.split(".");
  const lastKey = keys.pop()!;
  const target = keys.reduce((o, key) => (o ? o[key] : undefined), obj);
  if (target) {
    target[lastKey] = value;
  }
}

/**
 * Recursively searches the object (and all nested objects)
 * for a direct property whose key matches `targetKey`.
 *
 * @param {any} obj - The object to search
 * @param {string} targetKey - The property key to find
 * @param {string} [parentKey] - Optional immediate parent key of the target property
 * @returns {any} The value if found, otherwise undefined
 */
export function getValueBySingleKey(obj: any, targetKey: string, parentKey?: string): any {
  if (!obj || typeof obj !== "object" || !targetKey) {
    return undefined;
  }

  // Helper function to normalize keys for comparison
  const normalizeKey = (key: string) => key.toLowerCase().replace(/[^a-z0-9]/g, "");

  if (parentKey) {
    const parentKeyNormalized = normalizeKey(parentKey);
    const actualParentKey = Object.keys(obj).find(
      (key) => normalizeKey(key) === parentKeyNormalized
    );

    if (actualParentKey && obj[actualParentKey]) {
      const parentContext = obj[actualParentKey];

      if (parentContext && typeof parentContext === "object") {
        const targetKeyNormalized = normalizeKey(targetKey);
        const actualTargetKey = Object.keys(parentContext).find(
          (key) => normalizeKey(key) === targetKeyNormalized
        );

        if (actualTargetKey) {
          return parentContext[actualTargetKey];
        }
      }
    }

    // Handle case without parentKey
    const targetKeyNormalized = normalizeKey(targetKey);
    const actualKey = Object.keys(obj).find((key) => normalizeKey(key) === targetKeyNormalized);

    if (actualKey) {
      return obj[actualKey];
    }

    // Recursive search for nested objects
    for (const k of Object.keys(obj)) {
      const sub = obj[k];
      if (sub && typeof sub === "object") {
        const found = getValueBySingleKey(sub, targetKey);
        if (found !== undefined) {
          return found;
        }
      }
    }

    return undefined;
  }

  // Original behavior when no parentKey specified
  // Does this object itself have the key?
  if (Object.prototype.hasOwnProperty.call(obj, targetKey)) {
    return obj[targetKey];
  }

  // Otherwise, search all sub-objects
  for (const k of Object.keys(obj)) {
    const sub = obj[k];
    if (sub && typeof sub === "object") {
      const found = getValueBySingleKey(sub, targetKey);
      if (found !== undefined) {
        return found;
      }
    }
  }

  return undefined;
}

export function retrieveValue(value: ComparisonValue): string | boolean | null {
  if (value == null) return null;

  if (Array.isArray(value)) {
    const found = value.find((item) => retrieveValue(item));
    return retrieveValue(found);
  }

  if (isSelectOption(value)) {
    return value.label;
  }

  if (typeof value === "object") {
    if ("value" in value) {
      return retrieveValue(value?.value); //TODO this might cause some problems, to validate.
    } else {
      return retrieveValue(Object.values(value)); //TODO this might cause some problems, to validate.
    }
  }

  if (value == "true" || value === true) {
    return true;
  } else if (value == "false" || value === false) {
    return false;
  }

  return String(value).toLowerCase();
}
