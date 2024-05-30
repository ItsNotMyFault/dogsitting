export const animalRoutes = [
  {
    path: '/animal/create',
    name: 'animal-create',
    component: () => import('@views/Animal/form.vue'),
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
  }
]
