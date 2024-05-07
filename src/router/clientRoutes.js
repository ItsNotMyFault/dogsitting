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
  },
  {
    path: '/my-team',
    name: 'myteam',
    component: () => import('@views/Team/MyTeamView.vue'),
    meta: {
      title: 'My Team'
    }
  },
  {
    path: '/my-team/edit',
    name: 'myteam-edit',
    component: () => import('@views/Team/MyTeamEditView.vue'),
    meta: {
      title: 'Edit my team'
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
