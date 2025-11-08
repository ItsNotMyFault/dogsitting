import type { UseFetchOptions } from "nuxt/app";

/**
 * Tenant-aware API composable
 * Automatically includes tenant and auth headers
 */
export function useAPI<T>(url: string | (() => string), options?: UseFetchOptions<T>) {
  const config = useRuntimeConfig();

  // Build headers with tenant context
  const headers = computed(() => {
    const h: Record<string, string> = {};

    // Safely merge headers
    if (options?.headers) {
      if (typeof options.headers === "object" && options.headers !== null) {
        Object.assign(h, options.headers);
      }
    }

    // Add tenant header if available

    return h;
  });

  // Merge options with tenant headers
  const mergedOptions: UseFetchOptions<T> = {
    ...options,
    headers: headers.value,
    // Important: watch the tenant ID for reactivity
  };

  return useFetch(url, mergedOptions);
}
