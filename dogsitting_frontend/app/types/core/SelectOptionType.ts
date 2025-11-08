interface SelectOption {
  label: string;
  value: string | number | boolean | any;
  _type?: "option" | "category";
  category?: string;
  color?: string;
  disabled?: boolean;
  metadata?: any;
}

type InputType = "input" | "textarea" | "select" | "checkbox" | "number" | "file" | "date";
const inputTypes: InputType[] = [
  "input",
  "textarea",
  "select",
  "checkbox",
  "number",
  "file",
  "date"
];

type ComparisonValue = string | number | boolean | object | SelectOption | SelectOption[];

export { inputTypes };
export type { ComparisonValue, SelectOption };
