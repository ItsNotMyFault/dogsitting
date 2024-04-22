import { createRouter, createWebHistory } from 'vue-router'
import routes from '@/router/routes'

import { useAuthStore } from '@/stores/authStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
})

router.afterEach((to, from) => {
  document.title = to.meta.title
})

router.beforeEach((to) => {
  const authStore = useAuthStore()

  if (to.name === 'login' && authStore.getIsLoggedIn) {
    return '/'
  }

  if (to.meta.authorize && !authStore.isLoggedIn) {
    console.log('route requires auth')
    return '/login'
  }
})

export default router
