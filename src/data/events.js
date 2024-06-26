import Event from '@model/event'
const events = [
  new Event({
    title: 'All Day Event',
    start: '2024-03-25',
    className: 'available'
  }),
  new Event({
    title: 'All Day Event',
    start: '2024-03-26',
    className: 'available'
  }),
  new Event({
    title: 'All Day Event',
    start: '2024-03-27',
    className: 'available'
  }),
  new Event({
    title: 'All Day Event',
    start: '2024-03-28',
    className: 'available'
  }),
  new Event({
    id: 123123,
    title: 'Unknown Title boom',
    start: '2024-05-01',
    end: '2024-05-05',
    allDay: false,
    className: 'available'
  }),
  new Event({
    title: 'Meeting',
    start: '2024-03-12T14:30:00',
    end: '2024-05-12T18:30:00',
    className: 'classNameMetting',
    extendedProps: {
      status: 'done'
    }
  }),
  new Event({
    title: 'Birthday Party',
    start: '2024-05-05T07:00:00',
    backgroundColor: 'green',
    borderColor: 'green'
  }),
  new Event({
    // title: 'big test',
    start: '2024-05-19',
    display: 'background',
    backgroundColor: 'purple',
    test: {
      test: 'test'
    },
    extendedProps: {
      status: false
    }
  }),
  new Event({
    title: 'big test',
    start: '2024-05-20',
    end: '2024-05-25',
    // display: 'background',
    backgroundColor: 'purple',
    borderColor: 'purple',
    extendedProps: {
      status: false
    }
  })
  //   new Event({
  //     title: 'test',
  //     start: '2024-05-06T07:00:00',
  //     backgroundColor: 'green',
  //     borderColor: 'green',
  //     display: 'inverse-background'
  //   })
]

const availableEvents = [
  // new Event({
  //   start: '2024-03-28',
  //   display: 'background',
  //   backgroundColor: 'green',
  //   extendedProps: {
  //     status: false
  //   }
  // }),
  // new Event({
  //   start: '2024-03-29',
  //   display: 'background',
  //   backgroundColor: 'green',
  //   extendedProps: {
  //     status: false
  //   }
  // })
]

const busyEvents = [
  // new Event({
  //   start: '2024-05-25',
  //   display: 'background',
  //   backgroundColor: 'red',
  //   extendedProps: {
  //     status: false
  //   }
  // }),
  // new Event({
  //   start: '2024-05-26',
  //   display: 'background',
  //   backgroundColor: 'red',
  //   extendedProps: {
  //     status: false
  //   }
  // })
]

export { events, availableEvents, busyEvents }

/* parmis toutes les dates des 6 prochains mois
    retourner 

*/
