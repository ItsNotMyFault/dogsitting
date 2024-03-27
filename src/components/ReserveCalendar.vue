<template>
  <div class="demo-app">
    <div class="demo-app-main calendar">
      <FullCalendar :options="calendarOptions"></FullCalendar>
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
import { onMounted, ref, watch, computed } from 'vue'

export default {
  components: {
    FullCalendar
  },
  methods: {
    handleDateClick(arg) {
      console.log('date click! ' + arg.dateStr, arg)
    },
  },
  data() {
    return {
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
        events: [
          {
            title: 'All Day Event',
            start: '2024-03-25',
            className: 'available'
          },
          {
            id: 123123,
            title: "Unknown Title",
            start: '2024-04-01',
            end: '2024-04-05',
            allDay: false,
            className: "umbt-success",
            extendedProps: {
              // occupiedMoment: occupiedMoment,
              quarter1: 'test',
              // quarter2: quarter2,
              // quarter3: quarter3,
              // quarter4: quarter4,
            },
          },
          { title: 'event 1', date: '2024-04-01', className: 'classNameEvent1' },
          { title: 'event 2', date: '2024-04-02' },
          {
            title: 'Meeting',
            start: '2024-03-12T14:30:00',
            end: '2024-04-12T18:30:00',
            className: 'classNameMetting',
            extendedProps: {
              status: 'done'
            }
          },
          {
            title: 'Meeting',
            start: '2019-08-12T14:30:00',
            start: '2019-08-12T14:30:00',
            extendedProps: {
              status: 'done'
            }
          },
          {
            title: 'Birthday Party',
            start: '2024-04-05T07:00:00',
            backgroundColor: 'green',
            borderColor: 'green'
          }
        ],
        headerToolbar: {
          left: 'prev,next,today',
          center: 'title',
          right: 'timeGridWeek,dayGridMonth,timeGridDay,multiMonthYear,listMonth'
        },
        footerToolbar: {
          center: 'title',
        },
        slotMinTime: "07:00:00",
        slotMaxTime: "19:00:00",
      }
    }
  },
  created() {
    this.calendarOptions.dateClick = this.handleDateClick
    this.calendarOptions.weekends = this.showWeekends
  },
}
</script>
