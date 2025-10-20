// middleware/auth.global.ts

import { useAuthStore } from '~/stores/authStore'

export default defineNuxtRouteMiddleware((to, from) => {
  // Don't redirect if already on login page

  console.log("defineNuxtRouteMiddleware ------------------- to", to);

  // const { isLoggedIn } = useAuthStore();
  // console.log("isLoggedIn", isLoggedIn);

  // if (to.path.toLowerCase() === '/auth/login') {
  //   return;
  // }




  // if (!isLoggedIn) {
  //   return navigateTo('/auth/login')
  // }
})
