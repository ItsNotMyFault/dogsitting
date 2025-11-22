
export default defineNuxtRouteMiddleware(async (to, from) => {
  // Don't redirect if already on login page

  const { user: nuxtUser, loggedIn, fetch, clear } = useUserSession();

  const isLoginPage = to.path.toLowerCase().includes("/auth/login");

  if (isLoginPage && loggedIn.value) {
    return navigateTo('/');
  }

  if (!isLoginPage && !loggedIn.value) {
    return navigateTo('/auth/login');
  }
})
