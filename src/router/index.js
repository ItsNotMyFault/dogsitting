import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TeamView from '../views/TeamView.vue'
import AboutView from '../views/AboutView.vue'
import ReserveView from '../views/ReserveView.vue'

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
      // component: () => import('../views/AboutView.vue'),
      component: AboutView,
      meta: {
        title: 'Home'
      }
    },
    {
      path: '/team',
      name: 'team',
      // component: () => import('../views/TeamView.vue'),
      component: TeamView,
      meta: {
        title: 'Home'
      }
    },
    {
      path: '/reserve',
      name: 'reserve',
      component: ReserveView,
      // component: () => import('../views/ReserveView.vue'),
      meta: {
        title: 'Réserver'
      }
    }
  ]
})

export default router
