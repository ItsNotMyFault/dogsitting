import Event from '@model/event'
import DateFormat from '../utils/DateFormat'
import Calendar from '../utils/Calendar'

class ReservationEvent extends Event {
  constructor(data) {
    super(data)
    this.data = data
    this.id = data?.Id
    this.dateFrom = new Date(data?.DateTimePeriod?.StartDate)
    this.dateTo = new Date(data?.DateTimePeriod?.EndDate)
    var propEnddate = Calendar.GetProperEndDateTest2(data?.DateTimePeriod?.EndDate)
    this.start = DateFormat.GetDateFormatted(new Date(data?.DateTimePeriod?.StartDate))
    this.end = DateFormat.GetDateFormatted(propEnddate)
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
