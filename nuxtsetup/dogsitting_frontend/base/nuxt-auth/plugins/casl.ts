import { defineNuxtPlugin } from '#app'
import { abilitiesPlugin } from '@casl/vue'
import { useAbility } from '#nuxt-auth/composables/useAbility.js'
import { useProfileStore } from '#nuxt-auth/stores/useProfileStore'

export default defineNuxtPlugin((nuxtApp) => {
  const profileStore = useProfileStore()
  profileStore.updateAbility()

  nuxtApp.vueApp.use(abilitiesPlugin, profileStore.ability, {
    useGlobalProperties: true
  })

  return {
    provide: {
      can: (action: string, subject: string) => profileStore.ability.can(action, subject)
    }
  }
})
