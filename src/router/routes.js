import { clientRoutes } from './clientRoutes.js'
import { teamRoutes } from './teamRoutes.js'
import { Roles } from '@utils/Roles.js'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@views/HomeView.vue'),
    meta: {
      title: 'Home'
    }
  },
  ...clientRoutes,
  ...teamRoutes,
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
    component: () => import('@views/Pricing/index.vue'),
    meta: {
      title: 'Pricing'
    }
  },

  {
    path: '/reserve',
    name: 'reserve',
    component: () => import('@views/Reservation/ReserveView.vue'),
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
    path: '/dogs',
    name: 'dogs',
    component: () => import('@views/Dog/index.vue'),
    meta: {
      title: 'Pensionnaires'
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@views/Auth/login.vue'),
    meta: {
      title: 'Login'
    }
  },
  {
    path: '/logout',
    name: 'logout',
    component: () => import('@views/Auth/logout.vue'),
    meta: {
      title: 'Logout',
      authorize: [Roles.Client, Roles.Admin, Roles.SuperAdmin]
    }
  }
]

export default routes
