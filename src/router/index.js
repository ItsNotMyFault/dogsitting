import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: 'Home'
      }
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
      meta: {
        title: 'Home'
      }
    },
    {
      path: '/team',
      name: 'team',
      component: () => import('../views/TeamView.vue'),
      meta: {
        title: 'Home'
      }
    },
    {
      path: '/reserve',
      name: 'reserve',
      component: () => import('../views/ReserveView.vue'),
      meta: {
        title: 'Réserver'
      }
    }
  ]
})

export default router
