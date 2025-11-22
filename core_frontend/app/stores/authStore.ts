import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { UserType } from '~/model/user'

export const useAuthStore = defineStore(
  'auth',
  () => {
    const applicationUser = ref<UserType>()
    const isSuperAdmin = ref(true)
    const hasUserTeam = ref(false)
    const activeTeam = ref<string>()
    const userRoles = ref([])

    const getHasUserTeam = computed(() => activeTeam.value !== null && activeTeam.value !== undefined)
    const getIsSuperAdmin = computed(() => isSuperAdmin.value)
    const getTeam = computed(() => activeTeam.value)
    const getTeamName = computed(() => activeTeam.value)
    const getTeamNormalizedName = computed(() => activeTeam.value)

    function setActiveTeam(newTeam: string) {
      activeTeam.value = newTeam
    }

    function setApplicationUser(newUser: any) {
      applicationUser.value = newUser
    }

    const getUserId = computed(() => {
      return applicationUser.value ? applicationUser.value.id : null
    });

    return {
      // State
      applicationUser,
      setApplicationUser,
      getUserId,
      isSuperAdmin,
      hasUserTeam,
      team: activeTeam,
      userRoles,
      // Getters
      getHasUserTeam,
      getIsSuperAdmin,
      getTeam,
      getTeamName,
      getTeamNormalizedName,
      // Actions
      setActiveTeam,
    }
  },
  // {
  //   persist: true,
  // }
)
