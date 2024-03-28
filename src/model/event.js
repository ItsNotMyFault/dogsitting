class Event {
  constructor(title) {
    this.className = ''
    this.title = title
    this.allDay = false
    this.extendedProps = {}
    this.start = null
    this.end = null
  }
}

export default Event
