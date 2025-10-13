export const animalRoutes = [
  {
    path: '/animals/create',
    name: 'animals-create',
    component: () => import('@views/Animal/create.vue'),
    meta: {
      title: 'Create Animal'
    }
  },
  {
    path: '/animals',
    name: 'animals',
    component: () => import('@views/Animal/index.vue'),
    meta: {
      title: 'Animal List'
    }
  },
  {
    path: '/animals/:id/edit',
    name: 'animals-edit',
    component: () => import('@views/Animal/update.vue'),
    meta: {
      title: 'Animal List'
    },
    props: true // Pass route params as props
  }
]
