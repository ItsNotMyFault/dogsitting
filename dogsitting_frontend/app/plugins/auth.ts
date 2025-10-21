// plugins/auth.ts
import { defineNuxtPlugin } from '#app'
import { useAuthStore } from '~/stores/authStore'

// middleware for BFF to handle redirects
export default defineNuxtPlugin((nuxtApp: any) => {
	console.log("middleware for BFF-------------------");

	const authStore = useAuthStore(nuxtApp.$pinia)
	console.log("authStore.isLoggedIn", authStore.isLoggedIn)
	nuxtApp.hook('page:start', async (to: any) => {
		console.log("TO-------------", to)
		if (to?.path?.toLowerCase() === '/auth/login') return

		if (!authStore.isLoggedIn) {
			return navigateTo('/auth/login')
		}
	})
})   