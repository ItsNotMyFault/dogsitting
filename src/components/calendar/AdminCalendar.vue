<template>
  <div class="demo-app">
    <div class="demo-app-main calendar">
      <h1>ADMIN CALENDAR</h1>
      <FullCalendar ref="fullcalendar" :options="calendarOptions">
        <!-- <template v-slot:eventContent="arg">
          {{ arg.event?.title }} 
        </template> -->
      </FullCalendar>

    </div>
    <div class="calendarControls">
      <!-- {{ dateEvents }} -->
      dateEvents.length: {{ dateEvents.length }}
      <div v-for="event in dateEvents" :key="event.id">
        <!-- event: {{ event }} -->
        title => {{ event.title }}
        <br>
        PERIOD => {{ event.start }} - {{ event.end }}
        <br>
        <br>
        <button class="cta-button" @click="deleteReservation(event)">Delete</button>
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
import reservationServices from '@services/reservationServices'
import ReservationEvent from '@model/reservationEvent'
import DateFormat from '@/utils/DateFormat'
import LabeledEvent from '@/model/calendar/labeledEvent'

export default {
  name: 'AdminCalendar',

  props: {
    teamName: {
      type: String,
      required: true
    }
  },

  components: {
    FullCalendar,
  },
  methods: {
    handleDateClick(arg) {
      try {
        DateFormat.ValidateDatePastToday(arg.date)
      } catch (err) {
        console.warn(err)
        return
      }

      const prevSelectedCell = this.selectedCell
      if (prevSelectedCell) {
        prevSelectedCell.classList.remove('selected-day')
      }
      this.selectedCell = arg.dayEl
      this.selectedCell.classList.add('selected-day')

      //retrieve all events on a specific date.
      const events = this.fullCalendarApi.getEvents(arg.date)
      console.log('events', events);
      this.dateEvents = events.filter(event => {
        var end = event.start
        if (event?.end) {
          end = event?.end
        }
        return event.start <= arg.date && arg.date <= end
      }).map(dateEv => new ReservationEvent(dateEv.extendedProps.data))
    },
    async deleteReservation(reservationEvent) {
      if (confirm(`Are you sure you want to delete this reservation ${reservationEvent.title} => ${reservationEvent.id}?`)) {
        await reservationServices.deleteReservation(reservationEvent.id)
        this.fetchEvents()
      }
    },
    async fetchEvents() {
      var reservationEvents = await calendarServices.getReservationEvents(this.teamName);
      //TODO ya un problème d'affichage. Les dates reçu sont OK, mais les dates sont seulement sur une journée for some reason.
      this.originalReservationEvents = reservationEvents.map(event => event.calendarObjectEvent)
      console.log('this.originalReservationEvents', this.originalReservationEvents)
      this.calendarOptions.events = this.originalReservationEvents
    }
  },
  data() {
    return {
      fullCalendarApi: null,
      selectedCell: null,
      dateEvents: [],
      originalReservationEvents: [],
      calendarOptions: {
        height: 775,
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
        events: [],
        headerToolbar: {
          left: 'prev,next,today',
          center: 'title',
          right: 'timeGridWeek,dayGridMonth,multiMonthYear,listMonth'
        },
        dateClick: this.handleDateClick
      }
    }
  },
  async created() {
    this.fetchEvents()
  },

  mounted() {
    this.fullCalendarApi = this.$refs.fullcalendar.getApi();
  }
}
</script>
