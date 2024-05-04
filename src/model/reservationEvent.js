import Event from '@model/event'
import DateFormat from '@utils/DateFormat'
// import DateFormat from '@utils/DateFormat'

class ReservationEvent extends Event {
  constructor(data) {
    super(data)
    this.data = data
    this.id = data?.Id
    this.start = DateFormat.GetDateFormatted(new Date(data?.DateTimePeriod?.StartDate))
    this.end = DateFormat.GetDateFormatted(new Date(data?.DateTimePeriod?.EndDate))
    this.title = data?.EventSubject || 'missing title'
    // title: 'big test',
    // start: '2024-05-20',
    // end: '2024-05-25',
    // display: 'background',
    // backgroundColor: 'purple',
    // borderColor: 'purple',
    // this.allDay = data?.IsAllDayEvent
  }
}

export default ReservationEvent
