import { deepParse } from "./jsonparser";
function isEmpty(value: any) {
  value = jsonParsedCatch(value);

  if (isProxy(value)) {
    value = toRaw(value); // Unwrap Vue reactivity
  }

  if (value === null || value === undefined) {
    return true;
  }

  if (typeof value === "string" && value.trim() === "") {
    return true;
  }

  if (typeof value === "number" && isNaN(value)) {
    return true;
  }

  if (Array.isArray(value) && value.length === 0) {
    return true;
  }

  if (typeof value === "object") {
    if (Object.keys(value).length === 0) {
      return true;
    }
    return Object.values(value).every((v) => {
      if (v == null) return true;

      // Check for empty string, array, or object
      if (typeof v === "string" || Array.isArray(v)) {
        return v.length === 0;
      }

      if (typeof v === "object") {
        return Object.keys(v).length === 0;
      }

      return false;
    });
  }
  if (value === false) {
    return true;
  }

  return false;
}

function jsonParsedCatch(value: any) {
  let result = value;
  try {
    if (typeof value === "string") {
      result = deepParse(value);
    }
  } catch (error) { }
  return result;
}

export { isEmpty };
