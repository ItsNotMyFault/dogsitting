<template>
  <div class="demo-app">
    <div class="demo-app-main calendar">
      <FullCalendar ref="fullcalendar" :options="calendarOptions">
        <!-- <template v-slot:eventContent="arg">
          {{ arg.event?.title }} 
        </template> -->
      </FullCalendar>

    </div>
    <div class="calendarControls">
      <!-- {{ dateEvents }} -->
      <div v-for="event in dateEvents" :key="event.id">
        title => {{ event.title }}
        <br>
        PERIOD => {{ event.start }} - {{ event.end }}
        <br>
        event title => {{ event.extendedProps.data.EventSubject }}
        <br>
        <br>
      </div>
    </div>
  </div>
</template>

<script>


import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import multiMonthPlugin from '@fullcalendar/multimonth'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list';
import calendarServices from '@services/calendarServices'
import { events, availableEvents, busyEvents } from '../../data/events'
import DateFormat from '@utils/DateFormat'
export default {
  name: 'AdminCalendar',

  components: {
    FullCalendar,
  },
  methods: {
    handleDateClick(arg) {
      console.log('date click! ' + arg.dateStr, ' => ', arg)
      console.log('date:', arg.date);
      console.log('REF CALENDAR', this.fullCalendarApi);
      const prevSelectedDate = this.selectedDate
      this.selectedDate = arg.date;

      const prevSelectedCell = this.selectedCell
      if (prevSelectedCell) {
        prevSelectedCell.classList.remove('selected-day')
      }
      this.selectedCell = arg.dayEl
      this.selectedCell.classList.add('selected-day')

      const events = this.fullCalendarApi.getEvents(arg.date)
      this.dateEvents = events.filter(event => {
        return event.start <= arg.date && arg.date <= event.end
      });
    },
  },
  data() {
    return {
      fullCalendarApi: null,
      selectedDate: null,
      selectedCell: null,
      dateEvents: [],
      calendarOptions: {
        height: 875,
        expandRows: false,
        editable: false,
        droppable: false,
        plugins: [listPlugin, dayGridPlugin, interactionPlugin, timeGridPlugin, multiMonthPlugin],
        allDaySlot: true,
        initialView: 'dayGridMonth',
        views: {
          timeGridYear: {
            buttonText: 'Year'
          },
          multiMonthYear: {
            buttonText: 'multi month'
          },
          listMonth: { buttonText: 'List' },
        },
        weekends: true,
        events: [...events.map(event => event.data), ...availableEvents.map(event => event.data), ...busyEvents.map(event => event.data)],
        headerToolbar: {
          left: 'prev,next,today',
          center: 'title',
          right: 'timeGridWeek,dayGridMonth,multiMonthYear,listMonth'
        },
        footerToolbar: {
          center: 'title',
        },
        slotMinTime: "07:00:00",
        slotMaxTime: "20:00:00",
        eventResize: function (info) {
          console.log(info.event.title + " end is now " + info.event.end.toISOString());
        }
      }
    }
  },
  async created() {
    var teamName = "annieannick"
    var reservationEvents = await calendarServices.getReservationEvents(teamName);
    // this.originalEvents = reservationEvents.map(x => x.calendarObjectEvent)
    this.originalEvents = reservationEvents
    this.calendarOptions.events = this.originalEvents

    this.calendarOptions.dateClick = this.handleDateClick
    this.calendarOptions.dayCellDidMount = this.handleDayCellMount
    this.calendarOptions.dayCellClassNames = this.handleDayCellClassNames
  },

  mounted() {
    this.fullCalendarApi = this.$refs.fullcalendar.getApi();
  }
}
</script>
