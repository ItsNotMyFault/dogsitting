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
  },
  {
    path: '/team-calendar',
    name: 'teamcalendar',
    component: () => import('@views/Team/TeamCalendarAdminView.vue'),
    meta: {
      title: 'Team admin calendar'
    }
  }
]
