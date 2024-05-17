<template>
  <div class="demo-app">
    <div class="demo-app-main calendar availabilities-calendar">
      <h1>AVAILABILITIES CALENDAR</h1>
      <FullCalendar ref="fullcalendar" :options="calendarOptions">
      </FullCalendar>

    </div>
    <div class="calendarControls">
      should auto delete previously clicked event.
      <div>
        Legend <br>
        <ColorCircle color="red" small> unavailable dates. </ColorCircle>
        <ColorCircle color="green" small>available dates</ColorCircle>
        <ColorCircle color="yellow" small> reservations on those dates.</ColorCircle>
      </div>
      <form class="form" @submit.prevent="submitForm">
        <button @click="changeMode()" style="cursor: pointer;">current mode is => {{ isEdit ? 'EDIT' : 'ADD'
          }}</button>
        <label>
          <input type="checkbox" v-model="isAvailable" @update:model-value="compute()" v-if="!isEdit"> switch toggle
          here
        </label>
        dates to ADD
        <div v-for="date in toAddDates" :key="date">
          {{ date }} <button @click="removeDate(date)">delete</button>
        </div>
        dates to remove
        <div v-for="date in toRemoveDates" :key="date">
          {{ date }} <button @click="removeDate(date)">delete</button>
        </div>
        <div v-if="toAddDates?.length > 1">
          <button @click="removeAllDates()">delete all</button>
        </div>

        <button class="form-submit" type="text" @click="saveAvailabilities()">Save availabilities</button>
        <br>
        errorMessage: {{ errorMessage }}
      </form>

    </div>
  </div>
</template>

<script>

import ColorCircle from '@components/colorpicker/ColorCircle.vue'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import multiMonthPlugin from '@fullcalendar/multimonth'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'
import calendarServices from '@services/calendarServices'
import AvailableEvent from '@model/availableEvent'

import moment from 'moment'
import { warn } from 'vue'

export default {
  name: 'AvailabilitiesCalendar',

  props: {
    teamName: {
      type: String,
      required: true
    }
  },

  components: {
    FullCalendar,
    ColorCircle
  },

  methods: {
    changeMode() {
      this.isEdit = !this.isEdit
      this.toRemoveDates = []
      this.availableDates = []
      this.compute()
    },
    handleDateClick(arg) {
      if (moment(arg.dateStr) < moment().startOf('day')) {
        console.warn('clicked date is past.')
        return;
      }
      if (this.isEdit) {
        this.handleDelete(arg)
      } else {
        this.handleAdd(arg)
      }

    },
    compute() {
      if (this.isEdit) {
        this.computeDeleteAvailabilities()
      } else {
        this.computeAddAvailabilities()
      }
    },
    handleAdd(arg) {
      if (this.busyDates.includes(arg.dateStr)) {
        //todo add toastr
        console.warn('cant add an Availabilities on a date with reservations')
        return
      }
      if (this.availableDates.includes(arg.dateStr)) {
        //todo add toastr
        console.warn('cant add an Availabilities on a date with already set availabilities')
        return
      }
      if (this.toAddDates.includes(arg.dateStr)) {
        this.toAddDates = this.toAddDates.filter(date => date !== arg.dateStr)
      } else {
        this.toAddDates.push(arg.dateStr)
      }
      this.computeAddAvailabilities()
    },
    handleDelete(arg) {

      if (this.busyDates.includes(arg.dateStr)) {
        console.warn('cant set availabilities on a day with reservation')
        return
      }
      console.log('availableDates.includes: ', this.availableDates.includes(arg.dateStr));

      if (!this.toRemoveDates.includes(arg.dateStr)) {
        if (this.availableEventDates.includes(arg.dateStr)) {
          this.toRemoveDates.push({ start: arg.dateStr, IsAvailable: true })
        } else if (this.unAvailableEventDates.includes(arg.dateStr)) {
          this.toRemoveDates.push({ start: arg.dateStr, IsAvailable: false })
        }

      } else {
        this.toRemoveDates = this.toRemoveDates.filter(date => date.start !== arg.dateStr)
      }
      this.computeDeleteAvailabilities()
    },
    computeAddAvailabilities() {
      console.log('computeAddAvailabilities');
      const events = this.toAddDates.map(date => {
        return {
          start: date,
          display: 'background',
          backgroundColor: this.dateBackgroundColor,
        }
      })

      this.calendarOptions.events = [
        ...this.originalBusyEvents,
        ...this.originalAvailableEvents,
        ...events
      ]
    },
    computeDeleteAvailabilities() {
      console.log('computeDeleteAvailabilities');
      const filteredEvents = this.originalAvailableEvents.filter(event => this.toRemoveDates.map(date => date.start).includes(event.start) === false)
      const mappedfilteredEvents = filteredEvents.map(date => {
        return {
          start: date.start,
          display: 'background',
          backgroundColor: date.backgroundColor,
        }
      })

      this.calendarOptions.events = [...this.originalBusyEvents, ...mappedfilteredEvents]
    },
    async saveAvailabilities() {
      if (this.isEdit) {
        var dates = this.toRemoveDates.map(date => {
          return { date: date.start, isAvailable: date.IsAvailable }
        })
        await calendarServices.deleteAvailabilities(this.teamName, dates)
        this.toRemoveDates = []
        this.fetchEvents()
      } else {
        var dates = this.toAddDates.map(date => {
          return { date: date, isAvailable: this.isAvailable }
        })
        await calendarServices.addAvailabilities(this.teamName, dates)
        this.toAddDates = []
        this.fetchEvents()
      }

    },
    removeDate(date) {
      this.toRemoveDates = this.toRemoveDates.filter(dateToRemove => dateToRemove !== date)
      this.computeDeleteAvailabilities()
    },
    removeAllDates() {
      this.toRemoveDates = []
      this.computeAddAvailabilities()
    },
    async fetchEvents() {
      var { busyDates, availableDates } = await calendarServices.getAvailableEvents(this.teamName);
      this.originalBusyEvents = busyDates.map(x => x.calendarObjectEvent)
      this.originalAvailableEvents = availableDates.map(x => x.calendarObjectEvent)
      console.log('originalAvailableEvents', this.originalAvailableEvents);
      this.calendarOptions.events = [...this.originalBusyEvents, ...this.originalAvailableEvents]
    }
  },

  computed: {
    dateBackgroundColor() {
      return this.isAvailable ? '#4fce4f' : '#910d0d'
    },
    busyDates() {
      return this.originalBusyEvents.map(busyDate => busyDate.start)
    },
    availableDates() {
      return this.originalAvailableEvents.map(event => event.start)
    },
    availableEventDates() {
      return this.originalAvailableEvents.filter(event => event.isAvailable).map(date => date.start)
    },
    unAvailableEventDates() {
      return this.originalAvailableEvents.filter(event => !event.isAvailable).map(date => date.start)
    }
  },

  data() {
    return {
      originalBusyEvents: [],
      originalAvailableEvents: [],
      loaded: false,
      checked: false,
      selectedCell: null,
      isAvailable: false,
      toRemoveDates: [],
      toAddDates: [],
      isEdit: false,
      errorMessage: null,
      calendarOptions: {
        expandRows: true,
        allDaySlot: true,
        initialView: 'dayGridMonth',

        eventResizableFromStart: true,
        eventResourceEditable: true,

        weekends: true,
        events: [],
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
        editable: false,
        dateClick: this.handleDateClick
      }
    }
  },
  async created() {
    this.fetchEvents()

  },
}
</script>
