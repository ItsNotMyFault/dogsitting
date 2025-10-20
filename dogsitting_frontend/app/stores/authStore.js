import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import AuthService from '#reservation/services/authServices.js'

export const useAuthStore = defineStore(
  'auth',
  () => {
    // State
    const applicationUser = ref(null)
    const isSuperAdmin = ref(true)
    const isLoggedIn = ref(true)
    const hasUserTeam = ref(false)
    const team = ref(null)
    const userRoles = ref([])

    // Getters
    const getHasUserTeam = computed(() => team.value !== null && team.value !== undefined)
    const getIsSuperAdmin = computed(() => isSuperAdmin.value)
    const getUserId = computed(() => applicationUser.value?.id)
    const getTeam = computed(() => team.value)
    const getTeamName = computed(() => team.value?.normalizedName)
    const getTeamNormalizedName = computed(() => team.value?.normalizedName)

    // Actions
    async function authenticateUser() {
      try {
        const response = await AuthService.FacebookOauthLogin()
        isLoggedIn.value = true
        applicationUser.value = response
        console.log('applicationUser.value', applicationUser.value)
      } catch (error) {
        throw new Error(error)
      }
    }

    async function fetchLoggedInUser() {
      try {
        const loggedInUser = await AuthService.GetCurrentUser()
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
      team.value = null
      applicationUser.value = null
    }

    async function logoutUser() {
      await AuthService.LogoutUser()
      clearUser()
      window.open('/', '_self')
    }

    function setActiveTeam(newTeam) {
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
      getUserId,
      getTeam,
      getTeamName,
      getTeamNormalizedName,
      // Actions
      authenticateUser,
      fetchLoggedInUser,
      clearUser,
      logoutUser,
      setActiveTeam
    }
  },
  {
    persist: true
  }
)
