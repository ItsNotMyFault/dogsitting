const routes = [
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
    component: () => import('@views/Pricing/index.vue'),
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
    path: '/dogs',
    name: 'dogs',
    component: () => import('@views/Dog/index.vue'),
    meta: {
      title: 'Pensionnaires'
    }
  }
]

export default routes
