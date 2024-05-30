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
        this.$state.isLoggedIn = true
        this.$state.applicationUser = response
      } catch (error) {
        throw new Error(error)
      }
    },
    async fetchLoggedInUser() {
      // if (this.$state.applicationUser) {
      //   return
      // }
      try {
        const loggedInUser = await AuthService.GetCurrentUser()
        if (loggedInUser) {
          this.$state.isLoggedIn = true
          this.$state.applicationUser = loggedInUser
        }
      } catch (error) {
        this.clearUser()
      }
    },
    clearUser() {
      this.$state.isLoggedIn = false
      this.$state.isSuperAdmin = false
      this.$state.team = null
      this.$state.applicationUser = null
    },
    async logoutUser() {
      await AuthService.LogoutUser()
      this.clearUser()
      window.open('/', '_self')
    },
    setActiveTeam(team) {
      this.$state.team = team
    }
  }
})
