import Event from '@model/event'
import DateFormat from '@utils/DateFormat'

class BusyEvent extends Event {
  constructor(data) {
    super(data)
    this.display = 'background'
    this.start = DateFormat.GetDateFormatted(new Date(data?.DateTimePeriod?.StartDate))
    this.SetBackgroundColor()
  }

  SetBackgroundColor() {
    if (this.data.IsBusy && !this.data.IsFull) {
      this.backgroundColor = 'yellow'
    } else if (this.data.IsFree) {
      this.backgroundColor = 'green'
    } else if (this.data.IsFull) {
      this.backgroundColor = 'red'
    } else {
      this.backgroundColor = 'purple'
    }
  }
}

export default BusyEvent
