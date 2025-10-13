import { userRoutes } from './userRoutes.js'
import { teamRoutes } from './teamRoutes.js'
import { reservationRoutes } from './reservationRoutes.js'
import { animalRoutes } from './animalRoutes.js'
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
  ...userRoutes,
  ...teamRoutes,
  ...reservationRoutes,
  ...animalRoutes,
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
