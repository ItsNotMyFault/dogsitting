// middleware/auth.global.ts

import { useAuthStore } from '~/stores/authStore'

export default defineNuxtRouteMiddleware(async (to, from) => {
  // Don't redirect if already on login page

  console.log("defineNuxtRouteMiddleware ------------------- to", to);
  const { user: nuxtUser, loggedIn, fetch, clear } = useUserSession();

  console.log("nuxtUser", nuxtUser.value);
  console.log("loggedIn", loggedIn.value);

  const isLoginPage = to.path.toLowerCase() === '/auth/login';

  if (isLoginPage && loggedIn.value) {
    return navigateTo('/');
  }

  if (!isLoginPage && !loggedIn.value) {
    return navigateTo('/auth/login');
  }
})
