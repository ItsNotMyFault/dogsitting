export const useAuth = () => {
  const { user: nuxtUser, loggedIn, fetch, clear } = useUserSession();

  // Use the Nuxt user session directly (already plain object from auth.d.ts)
  const user = computed(() => nuxtUser.value);

  const isAuthenticated = computed(() => loggedIn.value && !!nuxtUser.value);
  const isLoading = ref(false);

  // User info helpers
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

  const loginWithFacebook = async () => {
    // Clear any existing PKCE cookies before starting new SSO flow
    clearPkceCookies();
    // await navigateTo("/api/auth/facebook", { external: true });
    // await $fetch('/api/auth/facebook');
    console.log("API URL", useRuntimeConfig());
    console.log("API URL", useRuntimeConfig().apiUrl);
    window.location.href = 'https://localhost:5188/login'
    // const response = await $fetch("/login", {
    //   baseURL: useRuntimeConfig().public.apiUrl,
    //   method: "GET",
    //   headers: {
    //     "Content-Type": "application/json"
    //   }
    // });
    // await setUserSession(event, sessionPayload);

    return {
      success: true
    };
  };

  const logout = async () => {
    try {
      isLoading.value = true;

      // Call logout API
      await $fetch("/api/auth/logout", {
        method: "POST"
      });

      // Clear session
      await clear();

      // Navigate to login
      await navigateTo("/auth/login");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      isLoading.value = false;
    }
  };

  // Clear PKCE cookies to prevent infinite loop when user cancels SSO and returns
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

  return {
    // State
    user: readonly(user),
    userInfo: readonly(userInfo),
    isAuthenticated: readonly(isAuthenticated),
    isLoading: readonly(isLoading),

    // Actions
    loginWithFacebook,
    logout,
    clearPkceCookies,
    refreshSession,
    hasRole
  };
};
