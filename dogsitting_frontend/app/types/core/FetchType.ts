import type { FilterDataType } from "./filter/FilterType";

export type Operator =
  | "in"
  | "like"
  | "between"
  | "equals"
  | "more"
  | "moreOrEqual"
  | "less"
  | "lessOrEqual"
  | "notEqual";

export const AllOperators: Operator[] = [
  "in",
  "like",
  "between",
  "equals",
  "more",
  "moreOrEqual",
  "less",
  "lessOrEqual",
  "notEqual"
];

export interface SearchParam {
  id?: string;
  model: string;
  value: any;
  searchOperator: Operator;
  searchValue?: string;
  dataType: FilterDataType;
}

export interface PaginatedResult<T> {
  page?: number;
  limit?: number;
  count: number;
  items: T[];
}

export interface FetchParams {
  page: number;
  limit: number;
  searchParam: SearchParam[];
  /**
   * @var sortBy boolean value as true === DESC, false === ASC
   */
  sortBy: Record<string, boolean>;
  isExclusiveFilter?: boolean;
  activeProperty?: string;
}
