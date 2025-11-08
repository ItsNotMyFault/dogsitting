import type { DatatableState } from "#core/types/core/DatatableType";
import type { SearchParam } from "#core/types/core/FetchType";
import { ref } from "vue";

export function useDatatableState<T = any>(): DatatableState<T> {
  const page = ref<number>(0);
  const limit = ref<number>(20);
  const searchParam = ref<SearchParam[]>([]);
  const defaultSearchParam = ref<SearchParam[]>([]);
  const sortBy = ref<Record<string, boolean>>({});
  const loading = ref<boolean>(true);
  const persistedColumns = ref<string[]>([]);
  const columnOrder = ref<string[]>([]);
  const activeProperty = ref<string | null>(null);
  const items = ref([]) as Ref<T[]>;

  const setPage = (newPage: number) => {
    page.value = newPage;
  };

  const getFetchParams = () => {
    return {
      page: page.value,
      limit: limit.value,
      sortBy: sortBy.value,
      searchParam: [...searchParam.value, ...defaultSearchParam.value]
    };
  };

  const addSearchParam = (id: string, newSearchParam: SearchParam) => {
    const existingIndex = searchParam.value.findIndex((param) => param.id === id);
    if (existingIndex !== -1) {
      searchParam.value[existingIndex] = { ...newSearchParam, id };
    } else {
      searchParam.value.push({ ...newSearchParam, id });
    }
  };

  function removeSearchParam(id: string) {
    if (Array.isArray(searchParam.value)) {
      searchParam.value = searchParam.value.filter((p: any) => p.id !== id);
    }
  }

  const getSearchParams = () => {
    return searchParam.value;
  };

  return {
    page,
    setPage,
    getFetchParams,
    getSearchParams,
    addSearchParam,
    removeSearchParam,
    limit,
    searchParam,
    defaultSearchParam,
    sortBy,
    loading,
    persistedColumns,
    columnOrder,
    activeProperty,
    items
  };
}
