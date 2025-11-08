import type { HttpClient } from "../../http/HttpClient";

export const $fetchClient: HttpClient = <T>(path: any, options: any) =>
  useNuxtApp().$api<T>(path, options);
