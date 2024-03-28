class Event {
  constructor(data) {
    this.data = data
    this.className = ''
    this.title = data?.title || 'missing title'
    this.allDay = false
    this.extendedProps = {}
    this.start = null
    this.end = null
    this.display = 'background'
  }
}

export default Event
