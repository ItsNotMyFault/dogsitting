export interface ApiClientOptions {
  /** HTTP verb – defaults to 'GET' */
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

  /** URL-encoded query-string parameters (merged into the URL) */
  params?: Record<string, string | number | boolean | undefined>;

  /** Request body (will be JSON-stringified unless you override headers) */
  data?: unknown;

  /** Extra headers (e.g. auth token) */
  headers?: Record<string, string>;

  /** Accept a raw Response instead of auto-parsing JSON */
  rawResponse?: boolean;

  /** Optional abort controller */
  signal?: AbortSignal;
}

export interface ApiClient {
  <T>(path: string, opts?: Parameters<typeof $fetch>[1]): Promise<T>;
}

export const apiClient: ApiClient = <T>(path: any, opts: any) => useNuxtApp().$api<T>(path, opts);
