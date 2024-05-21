export const clientRoutes = [
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
  },
  {
    path: '/my-reservations',
    name: 'myreservations',
    component: () => import('@views/Reservation/MyReservationView.vue'),
    meta: {
      title: 'My Reservations'
    }
  }
]
