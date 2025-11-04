// composables/useAuthApi.ts
import axios from 'axios'
import type { UserType } from '~/model/user';
// Ensure axios sends cookies with requests
axios.defaults.withCredentials = true


export function useAuthService() {
  const { user: nuxtUser, loggedIn, fetch, clear: clearUserSession } = useUserSession();
  console.log("nuxtUser", nuxtUser.value);

  const user = computed(() => nuxtUser.value);

  const isAuthenticated = computed(() => loggedIn.value && !!nuxtUser.value);
  const isLoading = ref(false);

  const config = useRuntimeConfig();
  const domainUrl = config.public.apiUrl;

  const userInfo = computed(() => {
    if (!user.value) return null;

    return user.value;
  });

  const hasRole = (role: string): boolean => {
    if (!user.value) return false;
    // Simple role check - can be extended based on your needs
    // For now, just check if user exists
    return true; // Placeholder - implement based on your role system
  };


  /**
   * Redirect to Facebook OAuth login
   */
  const facebookOauthLogin = async () => {
    clearPkceCookies();
    if (import.meta.client) {
      window.location.href = `${domainUrl}/login`;
    }
  }

  const clearPkceCookies = () => {
    // Clear PKCE cookies that might be left from cancelled OAuth flows using Nuxt's useCookie
    const pkceCookie = useCookie("nuxt-auth-pkce");
    const stateCookie = useCookie("nuxt-auth-state");

    // Set cookies to null to clear them
    pkceCookie.value = null;
    stateCookie.value = null;
  };


  // Refresh session
  const refreshSession = async () => {
    try {
      await fetch();
      return { success: true };
    } catch (error) {
      return { success: false, error };
    }
  };

  /**
   * Logout the user
   */
  const logoutUser = async () => {
    try {
      const response = await axios.get(`${domainUrl}/LogOff`)
      await clearUserSession();
      console.info('Successfully logged out', response)
      navigateTo('/auth/login');
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
      return response as any as UserType
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
    deleteLoginProvider,
    // State
    user: readonly(user),
    userInfo: readonly(userInfo),
    isAuthenticated: readonly(isAuthenticated),
    isLoading: readonly(isLoading),
    // Actions
    clearPkceCookies,
    refreshSession,
    hasRole
  }
}
