class Event {
  constructor(data) {
    this.data = data
    this.className = ''
    this.title = data.title
    this.allDay = false
    this.extendedProps = {}
    this.start = null
    this.end = null
  }
}

export default Event
