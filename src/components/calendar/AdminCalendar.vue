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
        <!-- event: {{ event }} -->
        title => {{ event.title }}
        <br>
        PERIOD => {{ event.start }} - {{ event.end }}
        <br>
        event title => {{ event.extendedProps.data.EventSubject }}
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
import { events, availableEvents, busyEvents } from '../../data/events'
import DateFormat from '@utils/DateFormat'
import ReservationEvent from '@model/reservationEvent'


export default {
  name: 'AdminCalendar',

  components: {
    FullCalendar,
  },
  methods: {
    handleDateClick(arg) {
      const prevSelectedCell = this.selectedCell
      if (prevSelectedCell) {
        prevSelectedCell.classList.remove('selected-day')
      }
      this.selectedCell = arg.dayEl
      this.selectedCell.classList.add('selected-day')

      const events = this.fullCalendarApi.getEvents(arg.date)
      console.log('events', events);
      this.dateEvents = events.filter(event => {
        return event.start <= arg.date && arg.date <= event.end
      })

    },
    async deleteReservation(event) {
      console.log('deleteReservation', event);
      var reservationEvent = new ReservationEvent(event.extendedProps.data)
      if (confirm(`Are you sure you want to delete this reservation ${reservationEvent.title}?`)) {
        await reservationServices.deleteReservation(reservationEvent.reservationId)
      }
      console.log('this.calendarOptions.events', this.calendarOptions.events);
      //TODO make method for .Id maj problem can occur..
      this.calendarOptions.events = this.calendarOptions.events.filter(event => event.data.Id !== reservationEvent.data.Id)
    }
  },
  data() {
    return {
      fullCalendarApi: null,
      selectedCell: null,
      dateEvents: [],
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
        footerToolbar: {
          center: 'title',
        },
        slotMinTime: "07:00:00",
        slotMaxTime: "20:00:00",
        dateClick: this.handleDateClick
      }
    }
  },
  async created() {
    var teamName = "annieannick"
    var reservationEvents = await calendarServices.getReservationEvents(teamName);
    this.calendarOptions.events = reservationEvents.map(event => event.calendarObjectEvent)
  },

  mounted() {
    this.fullCalendarApi = this.$refs.fullcalendar.getApi();
  }
}
</script>
