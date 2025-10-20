export const reservationRoutes = [
  {
    // TODO: add team name to route
    path: '/team-reservations',
    name: 'teamreservations',
    component: () => import('@views/Reservation/TeamReservationView.vue'),
    meta: {
      title: 'Team Reservations'
    }
  },
  {
    path: '/reservations/:id/detail',
    name: 'reservation-detail',
    component: () => import('@views/Reservation/Detail.vue'),
    meta: {
      title: 'Reservation detail'
    },
    props: (route) => ({
      ...route.params
    })
  },
  {
    path: '/team/:teamName/reservations/create',
    name: 'reservation-create',
    component: () => import('@views/Reservation/Create.vue'),
    meta: {
      title: 'Reservation create'
    },
    props: (route) => ({
      ...route.params
    })
  },
  {
    path: '/reservations/:id/detail-admin',
    name: 'reservation-detail-admin',
    component: () => import('@views/Reservation/DetailAdmin.vue'),
    meta: {
      title: 'Reservation Admin detail'
    },
    props: (route) => ({
      ...route.params
    })
  },
  {
    path: '/team-calendar',
    name: 'teamcalendar',
    component: () => import('@views/Team/TeamCalendarAdminView.vue'),
    meta: {
      title: 'Team admin calendar'
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
