import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useAuthService } from '#reservation/services/authServices'

export const useAuthStore = defineStore(
  'auth',
  () => {
    const authServices = useAuthService()
    // State
    const applicationUser = ref<object>()
    const isSuperAdmin = ref(true)
    const isLoggedIn = ref(true)
    const hasUserTeam = ref(false)
    const team = ref<string>()
    const userRoles = ref([])

    // Getters
    const getHasUserTeam = computed(() => team.value !== null && team.value !== undefined)
    const getIsSuperAdmin = computed(() => isSuperAdmin.value)
    const getTeam = computed(() => team.value)
    const getTeamName = computed(() => team.value)
    const getTeamNormalizedName = computed(() => team.value)

    // Actions
    async function authenticateUser() {
      try {
        const response = await authServices.facebookOauthLogin()
        isLoggedIn.value = true
        applicationUser.value = response
        console.log('applicationUser.value', applicationUser.value)
      } catch (error: any) {
        throw new Error(error)
      }
    }

    async function fetchLoggedInUser() {
      try {
        const loggedInUser = await authServices.getCurrentUser()
        console.log('loggedInUser', loggedInUser)
        if (loggedInUser) {
          isLoggedIn.value = true
          applicationUser.value = loggedInUser
        }
      } catch (error) {
        clearUser()
      }
    }

    function clearUser() {
      isLoggedIn.value = false
      isSuperAdmin.value = false
    }

    async function logoutUser() {
      await authServices.logoutUser()
      clearUser();
      window.open('/', '_self')
    }

    function setActiveTeam(newTeam: string) {
      team.value = newTeam
    }

    return {
      // State
      applicationUser,
      isSuperAdmin,
      isLoggedIn,
      hasUserTeam,
      team,
      userRoles,
      // Getters
      getHasUserTeam,
      getIsSuperAdmin,
      getTeam,
      getTeamName,
      getTeamNormalizedName,
      // Actions
      authenticateUser,
      fetchLoggedInUser,
      clearUser,
      logoutUser,
      setActiveTeam,
    }
  },
  {
    persist: true,
  }
)
