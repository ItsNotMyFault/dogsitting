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
  </div>
</template>

<script>


import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import multiMonthPlugin from '@fullcalendar/multimonth'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list';
import { availableEvents, busyEvents } from '../data/events'
import calendarServices from '@services/calendarServices'

export default {
  name: 'ClientCalendar',

  props: {
    team: {
      type: String,
      required: true
    }
  },

  components: {
    FullCalendar,
  },
  methods: {
    logstuff(arg) {
      // console.log(arg.title, arg)
    },
  },
  data() {
    return {
      loaded: false,
      calendarOptions: {
        height: 875,
        expandRows: true,
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
        events: [...availableEvents.map(event => event.data), ...busyEvents.map(event => event.data)],
        headerToolbar: {
          left: 'prev,next,today',
          center: 'title',
          right: 'timeGridWeek,dayGridMonth,timeGridDay,multiMonthYear,listMonth'
        },
        footerToolbar: {
          center: 'title',
        },
      }
    }
  },
  async created() {
    // this.team = "annieannick"
    var teamName = "annieannick"
    this.calendarOptions.dateClick = this.handleDateClick
    this.calendarOptions.weekends = this.showWeekends

    var busyEventsTest = await calendarServices.getBusyEvents(teamName);
    this.calendarOptions.events = busyEventsTest.map(x => x.calendarObjectEvent)

  },
}
</script>
