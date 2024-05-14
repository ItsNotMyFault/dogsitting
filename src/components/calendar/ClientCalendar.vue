<template>
  <div class="demo-app">
    <div class="demo-app-main calendar">
      <h1>CLIENT CALENDAR</h1>
      <FullCalendar ref="fullcalendar" :editable="true" :droppable="true" :options="calendarOptions">
        <template v-slot:eventContent="arg">
          {{ arg.event?.title }}
        </template>
      </FullCalendar>

    </div>
    <div class="calendarControls">
      <form class="form" @submit.prevent="submitForm">
        <label>date start</label>
        <!-- <VueDatePicker v-model="dateFrom" auto-apply :disabled-dates="[(new Date())]" :min-date="new Date()" /> -->
        <VueDatePicker :model-value="dateFrom" @update:model-value="handleDateFrom" auto-apply
          :disabled-dates="[(new Date())]" :min-date="new Date()" />
        <label>date end</label>
        <VueDatePicker :model-value="dateTo" @update:model-value="handleDateTo" auto-apply required />
        <label>Lodger count</label>
        <input type="number" v-model="lodgerCount" min="1" max="10" step="1">
        <label> Notes</label>
        <input type="text" v-model="notes">
        <label>
          <input type="checkbox" v-model="checked">
          I accept <a href="#">conditions</a>.
        </label>


        <button class="form-submit" type="text" @click="submitReservation()">Reserve</button>
      </form>

    </div>
  </div>
</template>

<script>


import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import multiMonthPlugin from '@fullcalendar/multimonth'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'
import calendarServices from '@services/calendarServices'
import reservationServices from '@services/reservationServices'
import { events, availableEvents, busyEvents } from '../../data/events'
import Reservation from '@/model/reservation'
import { useAuthStore } from '@/stores/authStore'
import moment from 'moment'

export default {
  name: 'ClientCalendar',

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
      // if (this.dateFrom !== null) {
      //   return
      // }
      // this.dateFrom = moment(new Date(arg.dateStr)).add(1, 'days').startOf('day')
      // this.dateTo = moment(new Date(arg.dateStr)).add(1, 'days').endOf('day')
      // console.log('arg.dateStr', arg.dateStr);

      // this.calendarOptions.events = [
      //   ...this.originalEvents,
      //   {
      //     start: arg.dateStr,
      //     title: this.title
      //   },
      //   { title: 'Event 2', start: '2024-05-20' },
      // ]
      // console.log('BROOOOOOOO');
      this.calendarOptions.events = [
        ...this.calendarOptions.events,
        {
          start: arg.dateStr,
          title: 'red',
        }
      ]
    },
    handleEventResize(info) {
      console.log('info', info);
      this.eventAdded = info
      this.dateTo = moment(new Date(info.event.end)).add(-1, 'days').endOf('day')
    },
    handleEventDragStop(info) {
      this.eventAdded = info
      this.dateFrom = moment(new Date(info.event.start))
      this.dateTo = moment(new Date(info.event.end)).add(-1, 'days').endOf('day')
    },
    submitReservation() {
      const authStore = useAuthStore();
      const newReservation = new Reservation()
      newReservation.dateFrom = this.dateFrom
      newReservation.dateTo = this.dateTo
      newReservation.client = authStore.applicationUser
      reservationServices.createReservation(newReservation, this.teamName)
    },
    handleDateFrom(date) {
      // if (date === null) {
      //   this.dateTo = null
      // }
      // //TODO fix this method ASAP
      // this.dateFrom = date
      // this.calendarOptions.events = [
      //   ...this.originalEvents,
      //   {
      //     start: this.dateFrom,
      //     end: this.dateTo,
      //     title: this.title
      //   }
      // ]
    },
    handleDateTo(date) {
      //TODO fix this method ASAP
      // this.dateTo = date
      // this.calendarOptions.events = [
      //   ...this.originalEvents,
      //   {
      //     start: this.dateFrom,
      //     end: this.dateTo,
      //     title: this.title
      //   }
      // ]
    },
    async fetchEvents() {
      var busyEvents = await calendarServices.getBusyEvents(this.teamName);
      if (!busyEvents.error) {
        this.originalEvents = busyEvents.map(x => x.calendarObjectEvent)
        this.calendarOptions.events = this.originalEvents
      }
    }
  },
  data() {
    return {
      checked: false,
      dateFrom: null,
      dateTo: null,
      lodgerCount: 0,
      notes: null,
      title: 'new reservation',
      eventAdded: null,
      calendarOptions: {
        // height: 875,
        expandRows: true,
        allDaySlot: true,
        initialView: 'dayGridMonth',
        editable: true,
        droppable: true,
        eventResizableFromStart: true,
        weekends: true,
        // events: [],
        events: [...events, ...busyEvents],
        headerToolbar: {
          left: 'prev,next,today',
          center: 'title',
          right: 'timeGridWeek,dayGridMonth,multiMonthYear'
        },
        plugins: [interactionPlugin, listPlugin, dayGridPlugin, timeGridPlugin, multiMonthPlugin],
        views: {
          timeGridYear: {
            buttonText: 'Year'
          },
          multiMonthYear: {
            buttonText: 'multi month'
          },
          listMonth: { buttonText: 'List' }
        },
        dateClick: (info) => this.handleDateClick(info),
        eventResize: (info) => this.handleEventResize(info),
        eventDrop: (info) => this.handleEventDragStop(info),
      }
    }
  },
  created() {
    // this.fetchEvents()


  },
}
</script>
