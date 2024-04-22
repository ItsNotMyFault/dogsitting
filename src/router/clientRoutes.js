export const clientRoutes = [
  {
    path: '/my-profile',
    name: 'myprofile',
    component: () => import('@views/MyUser/MyProfileView.vue'),
    meta: {
      title: 'My Profile'
    }
  }
]
