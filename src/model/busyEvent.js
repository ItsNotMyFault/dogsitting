// import Event from '@model/event'
import DateFormat from '@utils/DateFormat'

class BusyEvent {
  constructor(data) {
    this.data = data
    this.id = data?.Id
    console.log('busyEvent construct', data)
    this.display = 'background'
    //Busy events must use Date object for it to display properly. Can't use dateTime.
    this.start = DateFormat.GetDateFormatted(new Date(data?.DateTimePeriod?.StartDate))
    this.SetBackgroundColor()
  }

  SetBackgroundColor() {
    if (this.data?.IsBusy && !this.data?.IsFull) {
      // this.backgroundColor = 'green'
      this.backgroundColor = 'yellow'
    } else if (this.data?.IsFree) {
      this.backgroundColor = 'green'
    } else if (this.data?.IsFull) {
      this.backgroundColor = 'red'
    } else {
      this.backgroundColor = 'purple'
    }
  }

  get isBusy() {
    return this.data.IsBusy
  }
  get isFree() {
    return this.data.IsFree
  }
  get isFull() {
    return this.data.IsFull
  }

  get calendarObjectEvent() {
    return {
      data: this.data,
      start: this.start,
      display: this.display,
      backgroundColor: this.backgroundColor
    }
  }
}

export default BusyEvent
