<template>
  <div class="flex">
    <div class="demo-app-main calendar w-4/5">
      <h1>CLIENT CALENDAR</h1>
      <FullCalendar ref="fullcalendar" :options="calendarOptions">
      </FullCalendar>

    </div>
    <!-- //TODO split controls in another component. Client Calendar should only emit a date.  -->
    <!-- // Séparer ClientCalendar pour emit des dates.
    // => Recevoir ces dates dans une View TeamPresentationView. -->
    <UCard class="calendarControls w-1/5 bg-white p-6 m-4 text-black">
      <form class="form pt-20" @submit.prevent="submitForm">
        <label>date start</label>
        <DateRangePicker v-model="labeledEvent.dateFrom"></DateRangePicker>
        <VueDatePicker :model-value="labeledEvent.dateFrom" format="yyyy-MM-dd HH:mm:ss"
          @update:model-value="handleDateFrom" auto-apply :min-date="minDate" />
        <label>date end</label>
        <VueDatePicker :model-value="labeledEvent.dateTo" format="yyyy-MM-dd HH:mm:ss"
          @update:model-value="handleDateTo" auto-apply :min-date="minDate" />
        <label>Lodger count</label>
        <UInput type="number" v-model="lodgerCount" min="1" max="10" step="1" />
        <label> Notes</label>
        <textarea type="text" v-model="notes" rows="6" placeholder="Médicaments, horaire, info suppl+, etc." />
        <label>
          <UCheckbox v-model="checked" />
          I accept <a href="#">conditions</a>.
        </label>
        <button class="form-submit" type="text" @click="submitReservation()">Reserve</button>
      </form>

    </UCard>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'

//plugins
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import multiMonthPlugin from '@fullcalendar/multimonth'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'
//models
import LabeledEvent from '@/model/calendar/labeledEvent'
import DateFormat from '~/utils/DateFormat'
import { useReservationFormStore } from '@/stores/reservationFormStore'
import moment from 'moment'
import Calendar from '../../utils/Calendar'
import { CalendarRepositoryHttp } from '@/services/repositories/CalendarRepositoryHttp';
import { $fetchClient } from "~/libs/http/adapters/NuxtAdapter";

const calendarRepo = new CalendarRepositoryHttp($fetchClient)
// Props
const props = defineProps({
  teamName: {
    type: String,
    required: true
  }
})

// Router
const router = useRouter()

// Stores
const reservationFormStore = useReservationFormStore()

// Refs
const fullcalendar = ref(null)
const fullCalendarApi = ref(null)
const apiEvents = ref([])
const labeledEvent = ref(new LabeledEvent())
const originalEvents = ref([])
const lodgerCount = ref(1)
const checked = ref(false)
const dateFrom = ref(null)
const dateTo = ref(null)
const notes = ref(null)

// Computed values
const minDate = moment().add(1, 'day')
const formattedMinDate = DateFormat.FormatToNewDate(minDate)

// Calendar options
const calendarOptions = reactive({
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
  eventResize: (info) => handleEventDragStop(info),
  eventDrop: (info) => handleEventDragStop(info),
  dateClick: (info) => handleDateClick(info),
})

// Methods
const handleDateClick = (arg) => {
  try {
    if (labeledEvent.value && labeledEvent.value.isDefined()) {
      throw 'labeledEvent dateFrom already defined'
    } else {
      apiEvents.value = fullCalendarApi.value.getEvents()
      Calendar.ValidateNoOverlapBusyEvent(arg.date, apiEvents.value)
      labeledEvent.value = new LabeledEvent(arg.date)
    }
  } catch (err) {
    console.warn(err);
  }
  refreshCalendarEvents()
}

const handleEventDragStop = (info) => {
  var oldLabeledEvent = labeledEvent.value
  var properEndDate = Calendar.GetProperEndDate(info.event.end, info.event.start)
  var dailyDates = DateFormat.GetDailyDates(DateFormat.GetDateFormatted(info.event.start), DateFormat.GetDateFormatted(properEndDate))
  try {
    apiEvents.value = fullCalendarApi.value.getEvents()
    dailyDates.forEach(dailyDate => Calendar.ValidateNoOverlapBusyEvent(dailyDate, apiEvents.value))
    labeledEvent.value = new LabeledEvent(DateFormat.GetDateFormatted(info.event.start), DateFormat.GetDateFormatted(properEndDate))
  } catch (err) {
    console.warn(err)
    info.revert()
    labeledEvent.value = oldLabeledEvent
  }
}

const submitReservation = () => {
  const newReservation = {}
  console.log('labeledEvent.value', labeledEvent.value);
  newReservation.dateFrom = labeledEvent.value.dateFrom
  newReservation.dateTo = labeledEvent.value.dateTo
  newReservation.notes = notes.value
  newReservation.lodgerCount = lodgerCount.value

  if (!labeledEvent.value.dateFrom || !labeledEvent.value.dateTo) {
    //TODO add warning missing datefrom & dateto
    console.error('warning missing datefrom & dateto')
    return
  }

  reservationFormStore.setStep1Data(newReservation)
  router.push({ path: `/team/${props.teamName}/reservations/create` })
}

const handleDateFrom = (date) => {
  if (date === null) {
    labeledEvent.value.clearInputDates()
    refreshCalendarEvents()
    return
  }
  labeledEvent.value = new LabeledEvent(date, dateTo.value, 'new reservation')
  refreshCalendarEvents()
}

const handleDateTo = (date) => {
  //TODO fix this, it doesn't update the calendar correctly, dateTo is 1 day earlier than supposed to.
  //might be because of labeledEvent initiazliation with time or without time...
  if (date === null) {
    labeledEvent.value = new LabeledEvent(DateFormat.GetDateTimeFormatted(labeledEvent.value.dateFrom))
  } else {
    labeledEvent.value = new LabeledEvent(DateFormat.GetDateTimeFormatted(labeledEvent.value.dateFrom), DateFormat.GetDateTimeFormatted(date))
    labeledEvent.value.toString()
  }
  refreshCalendarEvents()
}

const refreshCalendarEvents = () => {
  if (labeledEvent.value.isDefined()) {
    calendarOptions.events = [
      ...originalEvents.value,
      labeledEvent.value.calendarObjectEvent
    ]
  } else {
    calendarOptions.events = [...originalEvents.value]
  }
}

const fetchEvents = async () => {
  var busyEvents = await calendarRepo.getBusyEvents(props.teamName);
  if (!busyEvents.error) {
    originalEvents.value = busyEvents.map(x => x.calendarObjectEvent)
    calendarOptions.events = originalEvents.value
    apiEvents.value = fullCalendarApi.value.getEvents()
  }
}

// Lifecycle hooks
onMounted(() => {
  reservationFormStore.setTeamName(props.teamName)
  fetchEvents()
  fullCalendarApi.value = fullcalendar.value.getApi()
})
</script>