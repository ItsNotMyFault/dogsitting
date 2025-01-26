import { useProfileStore } from '#nuxt-auth/stores/useProfileStore'

declare module 'next-auth' {
  interface Session {
    accessToken?: string
  }
}

export default defineNuxtPlugin((nuxtApp) => {
  const { status, data: session } = useAuth()

  const profileStore = useProfileStore()

  watch(
    status,
    () => {
      profileStore.updateAbility()
    },
    { immediate: true }
  )

  const api = $fetch.create({
    onRequest({ request, options, error }) {
      if (status.value === 'authenticated' && session.value?.accessToken) {
        const headers = (options.headers ||= {})
        if (Array.isArray(headers)) {
          headers.push(['Authorization', `Bearer ${session.value?.accessToken}`])
          headers.push(['Tenantid', 1])
        } else if (headers instanceof Headers) {
          headers.set('Authorization', `Bearer ${session.value?.accessToken}`)
          headers.set('Tenantid', 1)
        } else {
          headers.Authorization = `Bearer ${session.value?.accessToken}`
          headers.Tenantid = 1
        }
      }
    },
    async onResponseError({ response }) {
      if (response.status === 401) {
        await nuxtApp.runWithContext(() => navigateTo('/auth/login'))
      }
    }
  })

  // Expose to useNuxtApp().$api
  return {
    provide: {
      api
    }
  }
})
