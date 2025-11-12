<template>
  <div class="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 p-8">
    <div class="max-w-7xl mx-auto">
      <div class="flex gap-6 flex-col lg:flex-row">
        <!-- Calendar Section -->
        <div class="flex-1 bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border-2 border-purple-100">
          <div class="flex items-center gap-3 mb-6">
            <div class="bg-gradient-to-br from-purple-400 to-pink-400 p-3 rounded-2xl">
              <UIcon name="i-lucide-calendar" class="w-8 h-8 text-white" />
            </div>
            <h1 class="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Client Calendar
            </h1>
            <UIcon name="i-lucide-sparkles" class="w-6 h-6 text-yellow-400 animate-pulse" />
          </div>

          <div class="demo-app-main calendar">
            <FullCalendar ref="fullcalendar" :options="calendarOptions" />
          </div>
        </div>

        <!-- Controls Section -->
        <div class="w-full lg:w-96">
          <div class="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-6 border-2 border-pink-100">
            <div class="flex items-center gap-2 mb-6">
              <span class="text-2xl">🐾</span>
              <h2 class="text-2xl font-bold text-gray-800">Reservation</h2>
              <UIcon name="i-lucide-heart" class="w-5 h-5 text-pink-400 fill-pink-400 animate-pulse" />
            </div>

            <div class="space-y-6">
              <!-- Date Range Picker -->
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">
                  Sélectionner une période ✨
                </label>

                <DateRangePicker v-model="labeledEvent.dateFrom" model-format="yyyy-MM-dd HH:mm:ss"
                  :min-date="formattedMinDate" class="w-full" />
              </div>

              <!-- Animal Count -->
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">
                  Nombre d'animaux 🐾
                </label>
                <div class="flex items-center gap-3">
                  <button type="button" @click="lodgerCount = Math.max(1, lodgerCount - 1)"
                    class="w-10 h-10 rounded-full bg-purple-100 hover:bg-purple-200 text-purple-600 font-bold transition-colors">
                    -
                  </button>
                  <UInput v-model="lodgerCount" type="number" min="1" max="10"
                    class="flex-1 px-4 py-3 bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl text-center font-bold text-gray-700 focus:outline-none focus:border-purple-400" />
                  <button type="button" @click="lodgerCount = Math.min(10, lodgerCount + 1)"
                    class="w-10 h-10 rounded-full bg-purple-100 hover:bg-purple-200 text-purple-600 font-bold transition-colors">
                    +
                  </button>
                </div>
              </div>

              <!-- Notes -->
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">
                  Notes 📝
                </label>
                <UTextarea v-model="notes" placeholder="Médicaments, horaire, info suppl., etc." :rows="4"
                  class="w-full px-4 py-3 bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl resize-none focus:outline-none focus:border-purple-400 transition-colors" />
              </div>

              <!-- Checkbox -->
              <label class="flex items-center gap-3 cursor-pointer group">
                <UCheckbox v-model="checked" />
                <span class="text-sm text-gray-600 group-hover:text-gray-800">
                  I accept <a href="#" class="text-purple-600 hover:text-purple-700 font-semibold">conditions</a>
                </span>
              </label>

              <!-- Submit Button -->
              <UButton @click="submitReservation"
                :disabled="!checked || !labeledEvent.dateFrom?.start || !labeledEvent.dateFrom?.end"
                class="w-full py-4 rounded-xl justify-center font-bold text-lg transition-all duration-300 transform hover:scale-105"
                :class="{
                  'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 shadow-lg hover:shadow-xl': checked && labeledEvent.dateFrom?.start && labeledEvent.dateFrom?.end,
                  'bg-gray-200 text-white-400 cursor-not-allowed': !checked || !labeledEvent.dateFrom?.start || !labeledEvent.dateFrom?.end
                }">
                Reserve ✨
              </UButton>
            </div>

            <!-- Decorative elements -->
            <div class="mt-6 flex justify-center gap-2">
              <span class="text-2xl animate-bounce" style="animation-delay: 0s">🐶</span>
              <span class="text-2xl animate-bounce" style="animation-delay: 0.1s">🐱</span>
              <span class="text-2xl animate-bounce" style="animation-delay: 0.2s">🐰</span>
              <span class="text-2xl animate-bounce" style="animation-delay: 0.3s">🐹</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { DatePicker as VCalendarDatePicker } from 'v-calendar'
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
    // TODO fix update of selected period with calendar click.
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