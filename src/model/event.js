class Event {
  constructor(data) {
    this.data = data
    this.className = ''
    this.id = data?.Id
    this.start = null
    this.title = data?.EventSubject || 'missing title'
    // this.allDay = data?.IsAllDayEvent
  }

  get calendarObjectEvent() {
    return {
      start: this.start,
      display: this.display,
      backgroundColor: this.backgroundColor
    }
  }
}

export default Event
