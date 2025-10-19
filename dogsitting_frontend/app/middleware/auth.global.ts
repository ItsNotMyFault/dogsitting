// middleware/auth.global.ts

import { useAuthStore } from '#reservation/stores/authStore'

export default defineNuxtRouteMiddleware((to, from) => {
  // Don't redirect if already on login page

  console.log("to", to);

  if (to.path.toLowerCase() === '/auth/login') {
    return;
  }

  const { isLoggedIn } = useAuthStore()

  if (!isLoggedIn) {
    return navigateTo('/auth/login')
  }
})
