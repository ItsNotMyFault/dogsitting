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
    path: '/my-reservations',
    name: 'myreservations',
    component: () => import('@views/Reservation/MyReservationView.vue'),
    meta: {
      title: 'My Reservations'
    }
  },
  {
    path: '/team-reservations',
    name: 'teamreservations',
    component: () => import('@views/Reservation/TeamReservationView.vue'),
    meta: {
      title: 'Team Reservations'
    }
  }
]
