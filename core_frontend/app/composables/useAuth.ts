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

  // Permission checks using functional approach
  const hasPermission = (permission: string): boolean => {
    if (!user.value) return false;
    // Simple permission check - can be extended based on your needs
    // For now, just check if user has any roles/permissions
    return true; // Placeholder - implement based on your permission system
  };

  const hasRole = (role: string): boolean => {
    if (!user.value) return false;
    // Simple role check - can be extended based on your needs
    // For now, just check if user exists
    return true; // Placeholder - implement based on your role system
  };

  // SSO login
  const loginWithSSO = async () => {
    // Clear any existing PKCE cookies before starting new SSO flow
    clearPkceCookies();
    await navigateTo("/api/auth/zitadel", { external: true });
  };

  // Standard login (if needed for credential-based auth)
  const login = async (credentials: { username: string; password: string }) => {
    try {
      isLoading.value = true;

      // Use the API endpoint for login
      await $fetch("/api/auth/login", {
        method: "POST",
        body: credentials
      });

      // Refresh session after login
      await fetch();

      return { success: true };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || "Login failed"
      };
    } finally {
      isLoading.value = false;
    }
  };

  // Logout
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

  const clearUserSession = async () => {
    try {
      await $fetch("/api/auth/logout", {
        method: "POST"
      });
      await clear();
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
    login,
    logout,
    loginWithSSO,
    clearUserSession,
    clearPkceCookies,
    refreshSession,
    hasPermission,
    hasRole
  };
};
