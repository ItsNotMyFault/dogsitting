import type { FetchParams, PaginatedResult } from "~/types/core/FetchType";

export interface CrudRepository<
  TEntity,
  TKey,
  TCreateInput = TEntity,
  TUpdateInput = TEntity,
  TDetailedEntity = TEntity
> {
  search(opts?: FetchParams): Promise<PaginatedResult<TEntity>>;
  get(id: TKey): Promise<TDetailedEntity>;
  create(data: TCreateInput): Promise<TEntity>;
  update(id: TKey, data: TUpdateInput): Promise<TEntity>;
  remove(id: TKey): Promise<void>;
  exportData(params: FetchParams, parentId?: TKey): Promise<TEntity>;
}
