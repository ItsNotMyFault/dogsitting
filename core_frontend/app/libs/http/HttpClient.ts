export interface HttpRequestOptions {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  params?: Record<string, string | number | boolean | undefined>;
  body?: unknown;
  headers?: Record<string, string>;
  signal?: AbortSignal;
  responseType?: "json" | "blob" | "text" | "arrayBuffer";
}

export interface HttpClient {
  <T>(path: string, options?: HttpRequestOptions): Promise<T>;
}
