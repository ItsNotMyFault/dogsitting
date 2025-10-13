export const userRoutes = [
  {
    path: '/my-profile',
    name: 'myprofile',
    component: () => import('@views/MyUser/MyProfileView.vue'),
    meta: {
      title: 'My Profile'
    }
  },
  {
    path: '/my-profile/edit',
    name: 'myprofile-edit',
    component: () => import('@views/MyUser/MyProfileEditView.vue'),
    meta: {
      title: 'My Profile'
    }
  }
]
