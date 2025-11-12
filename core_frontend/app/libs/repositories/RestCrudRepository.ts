import type { FetchParams, PaginatedResult } from "~/types/core/FetchType";
import type { HttpClient, HttpRequestOptions } from "../http/HttpClient";
import type { CrudRepository } from "./CrudRepository";

export abstract class RestCrudRepositoryBase<
  TEntity,
  TKey extends string | number,
  TCreateInput = Partial<TEntity>,
  TUpdateInput = Partial<TEntity>,
  TDetailedEntity = TEntity
> implements CrudRepository<TEntity, TKey, TCreateInput, TUpdateInput, TDetailedEntity> {
  protected abstract readonly resource: string;

  protected readonly client: HttpClient;

  constructor(client: HttpClient) {
    this.client = client;
  }

  getDefaultFetchParams = (): FetchParams => {
    return {
      page: 0,
      limit: 20,
      searchParam: [],
      sortBy: {},
      activeProperty: ""
    };
  };

  get(id: TKey) {
    return this.client<TDetailedEntity>(`${this.resource}/${id}`);
  }

  create(data: TCreateInput) {
    return this.client<TEntity>(this.resource, {
      method: "POST",
      body: data
    } as HttpRequestOptions);
  }

  update(id: TKey, data: TUpdateInput) {
    return this.client<TEntity>(`${this.resource}/${id}`, {
      method: "PUT",
      body: data
    } as HttpRequestOptions);
  }

  remove(id: TKey) {
    return this.client<any>(`${this.resource}/${id}`, { method: "DELETE" });
  }

  exportData(params: FetchParams, parentId?: TKey) {
    return this.client<TEntity>(`${this.resource}/export`, {
      method: "POST",
      body: params
    });
  }
}
