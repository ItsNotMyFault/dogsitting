import { defineStore } from 'pinia'
import AuthService from '@/services/authServices.js'

export const useAuthStore = defineStore('auth', {
  persist: {
    storage: sessionStorage
  },

  state: () => ({
    applicationUser: null,
    isSuperAdmin: true,
    isLoggedIn: false,
    hasUserTeam: false,
    team: null,
    userRoles: []
  }),

  getters: {
    getIsLoggedIn: (state) => state.isLoggedIn,
    getHasUserTeam: (state) => state.team !== null && state.team !== undefined,
    getIsSuperAdmin: (state) => state.isSuperAdmin,
    getUserId: (state) => state.applicationUser.id,
    getTeam: (state) => state.team,
    getTeamName: (state) => state?.team?.normalizedName, //selected team id, eventually allow changing team profile.
    getTeamNormalizedName: (state) => state?.team?.normalizedName //selected team id, eventually allow changing team profile.
  },
  actions: {
    async authenticateUser() {
      try {
        const response = await AuthService.FacebookOauthLogin()
        if (response?.success || (response !== null && response !== undefined)) {
          this.$state.isLoggedIn = true
          this.$state.applicationUser = response
        } else {
          throw new Error('User must be authenticated')
        }
      } catch (error) {
        throw new Error(error)
      }
    },
    async logoutUser() {
      const response = { success: true }
      if (response?.success) {
        this.$state.isLoggedIn = false
        this.$state.team = null
        this.$state.applicationUser = null
        window.open('/', '_self')
      } else {
        throw new Error("User couldn't loggout")
      }
    },
    setActiveTeam(team) {
      this.$state.team = team
    }
  }
})
