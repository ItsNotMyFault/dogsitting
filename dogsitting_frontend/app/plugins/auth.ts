// plugins/auth.ts
import { defineNuxtPlugin } from '#app'

// middleware for BFF to handle redirects
export default defineNuxtPlugin((nuxtApp: any) => {
	console.log("middleware for BFF-------------------");
	const { user, loggedIn } = useUserSession()
	console.log("loggedIn", loggedIn.value)
	const authStore = useAuthStore()

	watchEffect(() => {
		if (loggedIn.value && user.value) {
			authStore.setApplicationUser(user.value)
		} else {
			authStore.setApplicationUser(undefined)
		}
	})

})   