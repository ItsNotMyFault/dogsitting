import type { SearchParam } from "~/types/core/FetchType";
import { storeToRefs, type StoreGeneric } from "pinia";
import { isRef, toRef, type Component, type Ref } from "vue";
import type { DefaultFilterDefinition, FilterDefinition } from "./filter/FilterType";
import type { NestedKeyOf } from "./filter/NestedType";

type CoreRefs<T> = Pick<
  DatatableState<T>,
  | "persistedColumns"
  | "searchParam"
  | "defaultSearchParam"
  | "items"
  | "page"
  | "limit"
  | "sortBy"
  | "columnOrder"
>;

// Accept either your composable result (already refs)
// or a Pinia store exposing those fields in state/getters.
type DatatableLike<T> =
  | DatatableState<T>
  | (StoreGeneric & Partial<Record<keyof CoreRefs<T>, any>>);

/** Normalize to typed refs no matter what kind of store you pass in */
export function toDatatableRefs<T>(s: DatatableLike<T>): CoreRefs<T> {
  // Pinia stores have $id; use storeToRefs on them.
  const src: any = typeof (s as any)?.$id === "string" ? storeToRefs(s as any) : s;

  const grab = <K extends keyof CoreRefs<T>>(k: K): CoreRefs<T>[K] => {
    const v = src[k];
    // If it’s already a ref (your composable), return as is.
    // If it’s raw (uncommon here), wrap with toRef to keep reactivity.
    return (isRef(v) ? v : toRef(src, k)) as CoreRefs<T>[K];
  };

  return {
    persistedColumns: grab("persistedColumns"),
    searchParam: grab("searchParam") as Ref<SearchParam[]>,
    defaultSearchParam: grab("defaultSearchParam") as Ref<SearchParam[]>,
    items: grab("items"),
    page: grab("page"),
    limit: grab("limit"),
    sortBy: grab("sortBy"),
    columnOrder: grab("columnOrder")
  };
}

export interface DatatableState<T = any> {
  page: Ref<number>;
  limit: Ref<number>;
  searchParam: Ref<SearchParam[]>;
  defaultSearchParam: Ref<SearchParam[]>;
  sortBy: Ref<Record<string, boolean>>;
  loading: Ref<boolean>;
  persistedColumns: Ref<string[]>;
  columnOrder: Ref<string[]>;
  activeProperty: Ref<string | null>;
  setPage: (pageNumber: number) => void;
  addSearchParam: (id: string, newSearchParam: SearchParam) => void;
  removeSearchParam: (id: string) => void;
  getFetchParams: () => {
    page: number;
    limit: number;
    sortBy: Record<string, boolean>;
    searchParam: SearchParam[];
  };
  getSearchParams: () => SearchParam[];
  items: Ref<T[]>; // Add items if your stores have them
}

interface DatatableHeader<T> {
  label: string;
  align?: "start" | "center" | "end";
  key: keyof T | "action" | "actions" | NestedKeyOf<T>;
  sortable?: boolean;
  sort?: (a: unknown, b: unknown, direction: "asc" | "desc") => number;
  visible?: boolean;
}

interface DatatableSlots<T> {
  field: keyof T | NestedKeyOf<T>;
  type?: "boolean" | "money" | "tags" | "string" | "phoneNumber" | "address" | null; //does nothing?
  component: Component;
  options?: Array<unknown>;
  computedValue?: (row: T) => any;
  props?: Record<string, any>;
}

interface DefaultSorting<T> {
  key: keyof T;
  order?: boolean | "asc" | "desc";
}

interface DatatableAction {
  iconName: string;
  iconColor: string;
  actionFunc?:
  | ((
    param: any,
    callbacks: {
      successAction: (action?: any) => void;
      errorAction: (error?: any) => void;
    }
  ) => void)
  | null;
  tooltip?: string;
  redirectToPage?: boolean | false;
  pageUrl?: string | null;
  active?: boolean | false | ((row: any) => boolean);
  conditional?: boolean | false;
  component?: Component;
  refresh?: boolean;
  props?: Record<string, any>;
}

const itemsPerPageList = [10, 25, 50, 100, 150, 200, 300, 400, 500];

const datatableItemsPerPageOptions = itemsPerPageList.map((value) => ({
  title: `${value}`,
  value: value
}));

interface DatatableType<T> {
  data: Array<unknown>;
  totalData: number;
  pageCount: number;
  itemsPerPage: number;
  itemStore: any;
  headers: DatatableHeader<unknown>[];
  persistedColumns: DatatableHeader<unknown>[];
  id: null | string;
  /**
   * List of filter definitions, will be associated to Vue Components to filter the datatable.
   * @var filterDefinitions
   */
  filterDefinitions: FilterDefinition<T>[];
  /**
   * List of filter definitions, doesn't have labels because they are not displayed.
   * @var defaultFilters
   */
  defaultFilters: DefaultFilterDefinition<T>[];
}
interface DatatableExposeMethods {
  reload: () => void;
  refresh: () => void;
}
interface BulkAction {
  id: string;
  label: string;
  icon: string;
  color?: string;
  requiresConfirmation?: boolean;
  confirmMessage?: string;
  handler: (ids: (string | number)[]) => Promise<void> | void;
  disabled?: boolean | ((count: number) => boolean);
}

export { datatableItemsPerPageOptions };
export type {
  BulkAction,
  DatatableAction,
  DatatableExposeMethods,
  DatatableHeader,
  DatatableSlots,
  DatatableType,
  DefaultSorting
};
