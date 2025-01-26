import { defineStore } from 'pinia'
import type { ProfileType } from '#nuxt-auth/types/ProfileType'
import { useAbility } from '#nuxt-auth/composables/useAbility.js'

export const useProfileStore = defineStore(
  'profile',
  () => {
    const abilitiesAsJson = ref<Record<string, string[]>>({})
    const profile = ref<ProfileType>()
    const { ability, updateAbility } = useAbility()

    async function fetchProfile() {
      const { data } = await useAPI<ProfileType>('/api/external/user/profile', {
        method: 'GET'
      })
      if (data && data.value) {
        profile.value = data.value
        abilitiesAsJson.value = JSON.parse(data.value.role.abilitiesAsJson)
        console.log('abilitiesAsJson', abilitiesAsJson.value)
        updateAbility()

        return data.value
      }
    }
    return {
      ability,
      updateAbility,
      profile,
      abilitiesAsJson,
      fetchProfile
    }
  },
  {
    persist: {
      key: 'profile-store',
      storage: persistedState.localStorage
    }
  }
)
