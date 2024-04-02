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
        title: 'À propos'
      }
    },
    {
      path: '/pricing',
      name: 'pricing',
      component: () => import('@views/Pricing/detail.vue'),
      meta: {
        title: 'Pricing'
      }
    },
    {
      path: '/teams',
      name: 'team',
      component: () => import('@views/Team/index.vue'),
      meta: {
        title: 'Équipes'
      }
    },
    {
      path: '/teams/:name',
      name: 'team-detail',
      component: () => import('@views/Team/detail.vue'),
      meta: {
        title: 'Équipe détail'
      }
    },
    {
      path: '/reserve',
      name: 'reserve',
      component: () => import('@views/ReserveView.vue'),
      meta: {
        title: 'Réserver'
      }
    },
    {
      path: '/activites',
      name: 'activites',
      component: () => import('@views/ActivitiesView.vue'),
      meta: {
        title: 'Activitées'
      }
    },
    {
      path: '/location',
      name: 'location',
      component: () => import('@views/LocationView.vue'),
      meta: {
        title: 'Lieu'
      }
    }
  ]
})

router.afterEach((to, from) => {
  document.title = to.meta.title
})

export default router
