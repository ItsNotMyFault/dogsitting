import Event from '@model/event'
import DateFormat from '@utils/DateFormat'
// import DateFormat from '@utils/DateFormat'
import moment from 'moment'

class ReservationEvent extends Event {
  constructor(data) {
    super(data)
    this.data = data
    this.id = data?.Id
    this.dateFrom = moment(data?.DateTimePeriod?.StartDate, 'YYYY-MM-DD HH:mm:ss')
    this.dateTo = moment(data?.DateTimePeriod?.EndDate, 'YYYY-MM-DD HH:mm:ss').add(1, 'day')
    this.start = DateFormat.GetDateFormatted(new Date(this.dateFrom))
    this.end = DateFormat.GetDateFormatted(new Date(this.dateTo))
    this.title = data?.EventSubject || 'missing title'
  }

  get calendarObjectEvent() {
    return {
      data: this.data,
      id: this.id,
      title: this.title,
      start: this.start,
      end: this.end,
      borderColor: 'green',
      backgroundColor: 'purple'
    }
  }
}

export default ReservationEvent
