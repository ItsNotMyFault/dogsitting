import type { UseFetchOptions } from "nuxt/app";

export function useAPI<T>(url: string | (() => string), options?: UseFetchOptions<T>) {
	options = {
		...options,
		watch: false
	};
	//TODO add some logic here for h2pro
	url = `/api/external${url}`;

	return useFetch(url, {
		...options,
		$fetch: useNuxtApp().$api
	});
}
