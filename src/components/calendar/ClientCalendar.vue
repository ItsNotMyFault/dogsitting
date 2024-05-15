@ -1,54 +1,27 @@
<template>
  <div class="demo-app">
    <div class="demo-app-main calendar">
      <h1>CLIENT CALENDAR</h1>
      <FullCalendar ref="fullcalendar" :options="calendarOptions">
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
import { events, availableEvents, busyEvents } from '../../data/events'

export default {
  name: 'ClientCalendar',

  components: {
    FullCalendar
  },

  methods: {
    handleDateClick(arg) {
      this.calendarOptions.events = [
        ...this.calendarOptions.events,
        {
          start: arg.dateStr,
          title: 'red',
          draggable: true,
          resizable: true,
        }
      ]
    },
  },
  data() {
    return {
      checked: false,
      dateFrom: null,
      dateTo: null,
      title: 'new reservation',
      eventAdded: null,
      calendarOptions: {
        // // height: 875,
        // expandRows: true,
        // allDaySlot: true,
        // initialView: 'dayGridMonth',
        // editable: true,
        // droppable: true,
        // draggable: true,
        // resizable: true,
        // eventResizableFromStart: true,
        // weekends: true,
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
          right: 'dayGridMonth,multiMonthYear'
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
        editable: true,
        droppable: true,
        eventResize: (info) => this.handleEventResize(info),
        eventDrop: (info) => this.handleEventDragStop(info),
      }
    }
  },

}
</script>