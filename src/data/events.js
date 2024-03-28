import Event from '../model/event'
const events = [
  new Event({
    title: 'All Day Event',
    start: '2024-03-25',
    className: 'available'
  }),
  new Event({
    id: 123123,
    title: 'Unknown Title',
    start: '2024-04-01',
    end: '2024-04-05',
    allDay: false,
    className: 'umbt-success',
    extendedProps: {
      // occupiedMoment: occupiedMoment,
      quarter1: 'test'
      // quarter2: quarter2,
      // quarter3: quarter3,
      // quarter4: quarter4,
    }
  }),
  new Event({
    title: 'Meeting',
    start: '2024-03-12T14:30:00',
    end: '2024-04-12T18:30:00',
    className: 'classNameMetting',
    extendedProps: {
      status: 'done'
    }
  }),
  new Event({
    title: 'Birthday Party',
    start: '2024-04-05T07:00:00',
    backgroundColor: 'green',
    borderColor: 'green'
  })
]

export default events
