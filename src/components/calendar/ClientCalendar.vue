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
        <VueDatePicker :model-value="labeledEvent.dateFrom" format="yyyy-MM-dd HH:mm:ss"
          @update:model-value="handleDateFrom" auto-apply :min-date="minDate" />
        <label>date end</label>
        <VueDatePicker :model-value="labeledEvent.dateTo" format="yyyy-MM-dd HH:mm:ss"
          @update:model-value="handleDateTo" auto-apply :min-date="minDate" />
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

//plugins
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import multiMonthPlugin from '@fullcalendar/multimonth'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'
//services
import calendarServices from '@services/calendarServices'
import reservationServices from '@services/reservationServices'
//models
import Reservation from '@/model/reservation'
import LabeledEvent from '@/model/calendar/labeledEvent'
import DateFormat from '@/utils/DateFormat'
import { useAuthStore } from '@/stores/authStore'
import moment from 'moment'
import BusyEvent from '@/model/busyEvent'
import Calendar from '@/utils/Calendar'

export default {
  name: 'ClientCalendar',

  props: {
    teamName: {
      type: String,
      required: true
    }
  },

  components: {
    FullCalendar
  },

  methods: {
    handleDateClick(arg) {
      try {
        if (this.labeledEvent && this.labeledEvent.isDefined()) {
          throw 'labeledEvent dateFrom already defined'
        } else {
          this.apiEvents = this.fullCalendarApi.getEvents()
          Calendar.ValidateNoOverlapBusyEvent(arg.date, this.apiEvents)
          this.labeledEvent = new LabeledEvent(arg.date)
        }
      } catch (err) {
        console.warn(err);
      }
      this.refreshCalendarEvents()
    },

    handleEventDragStop(info) {
      var oldLabeledEvent = this.labeledEvent
      var properEndDate = Calendar.GetProperEndDate(info.event.end, info.event.start)
      var dailyDates = DateFormat.GetDailyDates(DateFormat.GetDateFormatted(info.event.start), DateFormat.GetDateFormatted(properEndDate))
      try {
        this.apiEvents = this.fullCalendarApi.getEvents()
        dailyDates.forEach(dailyDate => Calendar.ValidateNoOverlapBusyEvent(dailyDate, this.apiEvents))
        this.labeledEvent = new LabeledEvent(DateFormat.GetDateFormatted(info.event.start), DateFormat.GetDateFormatted(properEndDate))
      } catch (err) {
        console.warn(err)
        info.revert()
        this.labeledEvent = oldLabeledEvent
      }
    },
    submitReservation() {
      const authStore = useAuthStore();
      const newReservation = {}
      newReservation.dateFrom = this.labeledEvent.dateFrom
      newReservation.dateTo = this.labeledEvent.dateTo
      newReservation.notes = this.notes
      newReservation.lodgerCount = this.lodgerCount
      reservationServices.createReservation(newReservation, this.teamName).then(res => {
        if (res?.status < 400 || res?.success) {
          this.labeledEvent.clearInputDates()
          this.fetchEvents()
          this.$router.push({ path: `/my-reservations` })
        }
      })
    },
    handleDateFrom(date) {
      if (date === null) {
        this.labeledEvent.clearInputDates()
        this.refreshCalendarEvents()
        return
      }
      this.labeledEvent = new LabeledEvent(date, this.dateTo, this.title)

      this.refreshCalendarEvents()
    },
    handleDateTo(date) {
      //TODO fix this, it doesn't update the calendar correctly, dateTo is 1 day earlier than supposed to.
      //might be because of labeledEvent initiazliation with time or without time...
      if (date === null) {
        this.labeledEvent = new LabeledEvent(DateFormat.GetDateTimeFormatted(this.labeledEvent.dateFrom))
      } else {
        this.labeledEvent = new LabeledEvent(DateFormat.GetDateTimeFormatted(this.labeledEvent.dateFrom), DateFormat.GetDateTimeFormatted(date))
        this.labeledEvent.toString()
      }
      this.refreshCalendarEvents()
    },
    refreshCalendarEvents() {
      if (this.labeledEvent.isDefined()) {
        this.calendarOptions.events = [
          ...this.originalEvents,
          this.labeledEvent.calendarObjectEvent
        ]
      } else {
        this.calendarOptions.events = [...this.originalEvents]
      }

    },
    async fetchEvents() {
      var busyEvents = await calendarServices.getBusyEvents(this.teamName);
      if (!busyEvents.error) {
        this.originalEvents = busyEvents.map(x => x.calendarObjectEvent)
        this.calendarOptions.events = this.originalEvents
        this.apiEvents = this.fullCalendarApi.getEvents()
      }
    }
  },
  data() {
    const minDate = moment().add(1, 'day')
    const formattedMinDate = DateFormat.FormatToNewDate(minDate)
    return {
      fullCalendarApi: null,
      apiEvents: [],
      labeledEvent: new LabeledEvent(),
      originalEvents: [],
      lodgerCount: 1,
      checked: false,
      dateFrom: null,
      dateTo: null,
      notes: null,
      minDate: formattedMinDate,
      title: 'new reservation',
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
        eventResize: (info) => this.handleEventDragStop(info),
        eventDrop: (info) => this.handleEventDragStop(info),
        dateClick: (info) => this.handleDateClick(info),
      }
    }
  },

  created() {
    this.fetchEvents()
  },

  mounted() {
    this.fullCalendarApi = this.$refs.fullcalendar.getApi();
  }


}
</script>