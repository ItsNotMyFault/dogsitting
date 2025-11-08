import Event from '@/model/event'
import DateFormat from '~/utils/DateFormat'

class AvailableEvent extends Event {
  constructor(data) {
    super(data)
    this.display = 'background'
    this.isAvailable = this.data.IsAvailable
    if (data?.DateTimePeriod) {
      this.start = DateFormat.GetDateFormatted(new Date(data?.DateTimePeriod?.StartDate))
    } else {
      this.start = data?.start
    }

    this.SetBackgroundColor()
  }

  SetBackgroundColor() {
    if (this.data.IsAvailable) {
      this.backgroundColor = 'green'
    } else {
      this.backgroundColor = 'red'
    }
  }

  get calendarObjectEvent() {
    return {
      data: this.data,
      start: this.start,
      display: this.display,
      backgroundColor: this.backgroundColor,
      isAvailable: this.data.IsAvailable,
    }
  }
}

export default AvailableEvent
