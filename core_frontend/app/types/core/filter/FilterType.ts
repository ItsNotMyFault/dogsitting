import type { Operator, SearchParam } from "~/types/core/FetchType";
import type { NestedKeyOf } from "./NestedType";

import type { SelectOption } from "~/types/core/SelectOptionType";

type FilterInputType = "textbox" | "number" | "daterange" | "date" | "select" | "autocomplete";
type FilterDataType =
  | "string"
  | "int"
  | "decimal"
  | "boolean"
  | "dateTime"
  | "dateOnly"
  | "guid"
  | "enum";

interface BaseFilterDefinition<T> {
  /**
   *  Used to reference/find an existing filterDefinition.
   *  Allow 2 pages to populate the same filter. (must be in the same store obviously)
   * @var id
   */
  id?: string;
  label: string | undefined;
  model: keyof T | NestedKeyOf<T>;
  isPrimary?: boolean;
  /**
   * always set this value to "", thank you.
   * @var value
   */
  value: string | number | undefined;
  type: FilterInputType;
  /**
   * Set to true if you want to display the operator when the filter is of type IsPrimary.
   * ByDefault the operator is always shown is the advanced Filter list
   * @var showOperatorSelect
   */
  showOperatorSelect?: boolean;
  /**
   * Is required so DefaultFilterDefinition work.
   * @var searchOperator
   */
  searchOperator?: Operator;
  /**
   * Determines if the filter is displayed.
   * If not specified, will be true by default.
   * @var active
   * @default true
   */
  active?: boolean;
}

export const TEXT_OPERATORS = ["like", "equals"] as const;
export const NUMBER_OPERATORS = [
  "between",
  "equals",
  "in",
  "more",
  "moreOrEqual",
  "less",
  "lessOrEqual",
  "notEqual"
] as const;
export const AUTOCOMPLETE_OPERATORS = ["in"] as const;
export const DATE_OPERATORS = [
  "between",
  "equals",
  "more",
  "moreOrEqual",
  "less",
  "lessOrEqual",
  "notEqual"
] as const;

export type TextOperator = (typeof TEXT_OPERATORS)[number];
export type NumberOperator = (typeof NUMBER_OPERATORS)[number];
export type DateOperator = (typeof DATE_OPERATORS)[number];

interface NumberFilterDefinition<T> extends BaseFilterDefinition<T> {
  type: "number";
  searchOperator: NumberOperator;
  dataType: Exclude<FilterDataType, "enum">;
}

interface TextboxFilterDefinition<T> extends BaseFilterDefinition<T> {
  type: "textbox";
  searchOperator: TextOperator;
  dataType: Exclude<FilterDataType, "enum">;
}

interface DateFilterDefinition<T> extends BaseFilterDefinition<T> {
  type: "date";
  dataType: "dateOnly" | "dateTime";
  searchOperator: DateOperator;
  value: string;
  /**
   * est seulement utilisé pour définir le format visuel de la date dans les filtres.
   * @var dateFormat
   */
  dateFormat?: string;
}

type BaseSelectFilterDefinition<T> = BaseFilterDefinition<T> & {
  type: "select";
  multiple?: boolean;
  options: SelectOption[];
};

type EnumSelectFilterDefinition<T> = BaseSelectFilterDefinition<T> & {
  dataType: "enum";
  searchOperator: "equals";
};

type RegularSelectFilterDefinition<T> = BaseSelectFilterDefinition<T> & {
  dataType: Exclude<FilterDataType, "enum">;
  searchOperator: Operator; // maybe restrict here if needed
};

type SelectFilterDefinition<T> = EnumSelectFilterDefinition<T> | RegularSelectFilterDefinition<T>;

interface AutoCompleteFilterDefinition<T> extends BaseFilterDefinition<T> {
  type: "autocomplete";
  dataType: Exclude<FilterDataType, "enum">;
  multiple: boolean;
  /**
   * Operator is by default set to LIKE in the Select-Filter component.
   * @var searchOperator
   */
  searchOperator: "in";
  labelProperty: string;
  additionalProperties?: string[];
  repository: any;
}

export type {
  DateFilterDefinition,
  NumberFilterDefinition,
  SelectFilterDefinition,
  TextboxFilterDefinition
};

type FilterDefinition<T> =
  | TextboxFilterDefinition<T>
  | DateFilterDefinition<T>
  | NumberFilterDefinition<T>
  | AutoCompleteFilterDefinition<T>
  | SelectFilterDefinition<T>;

type DefaultFilterDefinition<T> = Exclude<BaseFilterDefinition<T>, "label">;

export type {
  AutoCompleteFilterDefinition,
  BaseFilterDefinition,
  DefaultFilterDefinition,
  FilterDataType,
  FilterDefinition,
  FilterInputType,
  SearchParam
};

