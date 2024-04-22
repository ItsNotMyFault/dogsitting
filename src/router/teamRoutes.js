export const teamRoutes = [
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
    },
    props: true
  },
  {
    path: '/teams/create',
    name: 'team-create',
    component: () => import('@views/Team/form.vue'),
    meta: {
      title: 'Équipe création'
    }
  }
]
