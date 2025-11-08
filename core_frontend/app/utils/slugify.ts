const slugify = (text: string): string => {
  if (!text) return null;
  return text
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-");
};

const variabify = (text: string): string => {
  if (!text) return null;
  return text
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "");
};
/**
 * Prettify a string by adding spaces before uppercase letters and trimming it.
 * @param text The text to prettify.
 * @returns A prettified string.
 */
const prettify = (text: string): string => {
  if (!text) return null;
  return text.replace(/([A-Z])/g, " $1").trim();
};

export { slugify, variabify, prettify };
