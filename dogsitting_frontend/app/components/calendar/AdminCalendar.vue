<template>
  <div class="demo-app">
    <div class="demo-app-main calendar">
      <h1>ADMIN CALENDAR</h1>
      <FullCalendar ref="fullcalendar" :options="calendarOptions">
      </FullCalendar>

    </div>
    <div class="calendarControls">
      dateEvents.length: {{ dateEvents.length }}
      <div v-for="event in dateEvents" :key="event.id">
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
import reservationServices from '@services/reservationServices'
import ReservationEvent from '@/model/reservationEvent'
import DateFormat from '~/utils/DateFormat'
import LabeledEvent from '@/model/calendar/labeledEvent'
import Calendar from '@/utils/Calendar'

import { CalendarRepositoryHttp } from '@/services/repositories/CalendarRepositoryHttp';
import { $fetchClient } from "~/libs/http/adapters/NuxtAdapter";

const calendarRepo = new CalendarRepositoryHttp($fetchClient)

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
        Calendar.DoMagic(arg.date)
        DateFormat.ValidateDatePastToday(arg.date)
      } catch (err) {
        console.warn(err)
        return
      }

      this.cssSelectDay(arg)
      this.refreshSelectedEvents(arg.date)

    },
    refreshSelectedEvents(date) {
      var events = this.fullCalendarApi.getEvents()

      this.dateEvents = events.map(dateEv => new ReservationEvent(dateEv.extendedProps.data))
      this.dateEvents = this.dateEvents.filter(event => {
        return event.dateFrom <= date && date <= event.dateTo
      })
    },
    cssSelectDay(arg) {
      const prevSelectedCell = this.selectedCell
      if (prevSelectedCell) {
        prevSelectedCell.classList.remove('selected-day')
      }
      this.selectedCell = arg.dayEl
      this.selectedCell.classList.add('selected-day')
    },
    async deleteReservation(reservationEvent) {
      if (confirm(`Are you sure you want to delete this reservation ${reservationEvent.title} => ${reservationEvent.id}?`)) {
        await reservationServices.deleteReservation(reservationEvent.id)
        this.fetchEvents()
      }
    },
    async fetchEvents() {
      var reservationEvents = await calendarRepo.getReservationEvents(this.teamName);
      //TODO ya un problème d'affichage. Les dates reçu sont OK, mais les dates sont seulement sur une journée for some reason.
      this.originalReservationEvents = reservationEvents.map(event => event.calendarObjectEvent)
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
