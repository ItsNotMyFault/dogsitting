<template>
  <div class="demo-app">
    <div class="demo-app-main calendar">
      <FullCalendar ref="fullcalendar" :options="calendarOptions">
        <template v-slot:eventContent="arg">
          {{ logstuff(arg.event) }}
          {{ arg.event?.title }}
        </template>
      </FullCalendar>

    </div>
    <div class="calendarControls">
      asdfasdf
      should show error message if trying to add event on unavailable cases.
      <br>
      auto complete after clicking on calendar. enable drag event.
      <br>
      should auto delete previously clicked event.
      <form class="form" @submit.prevent="submitForm">
        <label>date start</label>
        <!-- <VueDatePicker v-model="dateFrom" auto-apply :disabled-dates="[(new Date())]" :min-date="new Date()" /> -->
        <VueDatePicker :model-value="dateFrom" @update:model-value="handleDateFrom" auto-apply
          :disabled-dates="[(new Date())]" :min-date="new Date()" />
        <label>date end</label>
        <VueDatePicker :model-value="dateTo" @update:model-value="handleDateTo" @change="test" auto-apply required />
        <label>Lodger count</label>
        <input type="number" v-model="lodgerCount" min="1" max="10" step="1">
        <label>
          <input type="checkbox" v-model="checked">
          I accept conditions.
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
import { availableEvents, busyEvents } from '../../data/events'
import Reservation from '@/model/reservation'
import { useAuthStore } from '@/stores/authStore'

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
      if (this.dateFrom !== null) {
        return
      }
      console.log('date click! ' + arg.dateStr, arg)
      console.log(this.$refs.fullcalendar);
      const fullCalendarApi = this.$refs.fullcalendar.getApi()
      this.dateFrom = new Date(arg.dateStr)
      console.log(fullCalendarApi);
      this.calendarOptions.events = [
        ...this.originalEvents,
        {
          start: arg.dateStr,
          title: this.title
        }
      ]
    },
    test(test) {
      console.log('test', test)
    },
    handleEventResize(info) {
      this.eventAdded = info
      console.log(info.event.end)
      this.dateTo = new Date(info.event.end)
    },
    handleEventDragStop(info) {
      this.eventAdded = info
      console.log(info);
      console.log('info.event.start', info.event.start);
      console.log('info.event.end', info.event.end);
      this.dateFrom = new Date(info.event.start)
      this.dateTo = new Date(info.event.end)
    },
    handleDateFrom(date) {
      console.log('handledateFrom', date, this.$refs.fullcalendar);

      this.dateFrom = date
      this.calendarOptions.events = [
        ...this.originalEvents,
        {
          start: date,
          title: this.title
        }
      ]


    },
    submitReservation() {
      const authStore = useAuthStore();
      const newReservation = new Reservation()
      newReservation.dateFrom = this.dateFrom
      newReservation.dateTo = this.dateTo
      newReservation.client = authStore.applicationUser
      reservationServices.createReservation(newReservation, this.teamName)
    },
    handleDateTo(date) {
      this.dateTo = date
      this.calendarOptions.events = [
        ...this.originalEvents,
        {
          start: this.dateFrom,
          end: date,
          title: this.title
        }
      ]
    },
    logstuff(arg) {
      // console.log(arg.title, arg)
    },
  },
  data() {
    return {
      loaded: false,
      checked: false,
      dateFrom: null,
      dateTo: null,
      title: 'new reservation',
      eventAdded: null,
      calendarOptions: {
        height: 875,
        expandRows: true,
        allDaySlot: true,
        initialView: 'dayGridMonth',

        eventResizableFromStart: true,
        eventResourceEditable: true,

        weekends: true,
        events: [
          ...availableEvents.map((event) => event.data),
          ...busyEvents.map((event) => event.data)
        ],
        headerToolbar: {
          left: 'prev,next,today',
          center: 'title',
          right: 'timeGridWeek,dayGridMonth,multiMonthYear'
        },
        plugins: [listPlugin, dayGridPlugin, interactionPlugin, timeGridPlugin, multiMonthPlugin],
        views: {
          timeGridYear: {
            buttonText: 'Year'
          },
          multiMonthYear: {
            buttonText: 'multi month'
          },
          listMonth: { buttonText: 'List' }
        },
        editable: true,
        droppable: true,
        eventResize: (info) => this.handleEventResize(info),
        eventDrop: (info) => this.handleEventDragStop(info),
      }
    }
  },
  async created() {
    // this.team = "annieannick"
    var teamName = "annieannick"
    this.calendarOptions.dateClick = this.handleDateClick

    var busyEventsTest = await calendarServices.getBusyEvents(teamName);

    this.originalEvents = busyEventsTest.map(x => x.calendarObjectEvent)
    this.calendarOptions.events = this.originalEvents

  },
}
</script>
