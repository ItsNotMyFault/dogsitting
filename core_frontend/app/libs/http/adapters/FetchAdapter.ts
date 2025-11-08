import type { HttpClient, HttpRequestOptions } from "../../http/HttpClient";

export const $fetchAdapterClient: HttpClient = async <T>(path: string, options?: HttpRequestOptions) => {
  const baseUrl = import.meta.env.NUXT_API_URL;

  if (!baseUrl || !baseUrl.startsWith("http")) {
    throw new Error("Invalid NUXT_API_URL");
  }

  const url = new URL(path, baseUrl);

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000); // 10s max

  try {
    const response = await fetch(url.toString(), {
      method: options?.method,
      headers: {
        "Content-Type": "application/json",
        ...options?.headers
      },
      body: options?.body ? JSON.stringify(options.body) : undefined,
      signal: options?.signal ?? controller.signal
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } finally {
    clearTimeout(timeout);
  }
};
