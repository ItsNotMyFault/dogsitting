import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@views/HomeView.vue'),
      meta: {
        title: 'Home'
      }
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@views/AboutView.vue'),
      meta: {
        title: 'Home'
      }
    },
    {
      path: '/team',
      name: 'team',
      component: () => import('@views/TeamView.vue'),
      meta: {
        title: 'Home'
      }
    },
    {
      path: '/reserve',
      name: 'reserve',
      component: () => import('@views/ReserveView.vue'),
      meta: {
        title: 'Réserver'
      }
    }
  ]
})

export default router
