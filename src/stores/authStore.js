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
    hasUserTeam: true,
    userRoles: []
  }),

  getters: {
    getIsLoggedIn: (state) => state.isLoggedIn,
    getHasUserTeam: (state) => state.hasUserTeam,
    getIsSuperAdmin: (state) => state.isSuperAdmin
  },
  actions: {
    async authenticateUser() {
      try {
        const response = await AuthService.FacebookOauthLogin()
        console.log('FacebookOauthLogin response', response)
        if (response?.success) {
          this.$state.isLoggedIn = true
        } else {
          throw new Error('User must be authenticated')
        }
      } catch (error) {
        console.error('Error during authentication:', error)
        throw new Error(error)
      }
    },
    async logoutUser() {
      console.log('STORE logoutUser method')
      const response = { success: true }
      if (response?.success) {
        this.$state.isLoggedIn = false
        window.open('/', '_self')
      } else {
        throw new Error("User couldn't loggout")
      }
    }
  }
})
