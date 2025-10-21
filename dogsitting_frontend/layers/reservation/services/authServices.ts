// composables/useAuthApi.ts
import axios from 'axios'
import User from '~/model/user'

// Ensure axios sends cookies with requests
axios.defaults.withCredentials = true

const domainUrl = import.meta.env.NUXT_API_URL

export function useAuthService() {
  /**
   * Redirect to Facebook OAuth login
   */
  const facebookOauthLogin = async () => {
    window.location.href = 'https://localhost:5188/login'
    return { success: true }
  }

  /**
   * Logout the user
   */
  const logoutUser = async () => {
    try {
      const response = await axios.get(`${domainUrl}/LogOff`)
      console.info('Successfully logged out', response)
      return response.data
    } catch (error: any) {
      const message = `${error.response?.data?.message || 'Unknown error'}, ${error.response?.data?.code || 'no_code'}`
      throw new Error(message)
    }
  }

  /**
   * Get currently authenticated user
   */
  const getCurrentUser = async () => {
    try {
      const response = await axios.get(`${domainUrl}/authuser`)
      return new User(response.data)
    } catch (error: any) {
      const message = `${error.response?.data?.message || 'Unknown error'}, ${error.response?.data?.code || 'no_code'}`
      throw new Error(message)
    }
  }

  /**
   * Get all login providers for the current user
   */
  const getUserLoginProviders = async () => {
    try {
      const response = await axios.get(`${domainUrl}/Authentication/GetUserLoginProviders`)
      return response
    } catch (error: any) {
      const message = `${error.response?.data?.message || 'Unknown error'}, ${error.response?.data?.code || 'no_code'}`
      throw new Error(message)
    }
  }

  /**
   * Delete a login provider
   */
  const deleteLoginProvider = async (providerName: string) => {
    try {
      const response = await axios.delete(`${domainUrl}/Authentication/DeleteLoginProvider`, {
        params: { ProviderName: providerName }
      })
      return response
    } catch (error: any) {
      const message = `${error.response?.data?.message || 'Unknown error'}, ${error.response?.data?.code || 'no_code'}`
      throw new Error(message)
    }
  }

  return {
    facebookOauthLogin,
    logoutUser,
    getCurrentUser,
    getUserLoginProviders,
    deleteLoginProvider
  }
}
