function deepParse(str: any) {
  if (typeof str !== "string") {
    return str;
  }
  try {
    const parsed = JSON.parse(str);
    // Only recurse after successful parse
    return deepParse(parsed);
  } catch (_) {
    return str;
  }
}

export { deepParse };
