const calendarOptions = {
  // height: 850,
  contentHeight: 900,
  headerToolbar: {
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth,timeGridWeek,timeGridDay'
  },
  initialView: 'dayGridMonth',
  // initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
  editable: true,
  selectable: true,
  selectMirror: true,
  dayMaxEvents: true,
  weekends: true,
  select: this.handleDateSelect,
  eventClick: this.handleEventClick,
  eventsSet: this.handleEvents
}

export default calendarOptions
