<template>
  <div class="min-h-screen bg-default p-8">
    <div class="mx-auto">
      <div class="flex gap-6 flex-col lg:flex-row">
        <!-- Calendar Section -->
        <div class="flex-1  backdrop-blur-sm rounded-3xl shadow-xl p-8 border-2 border-purple-100">
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
        <!-- TODO: ajouter une sélection animal type. Certaines teams peuvent ne garder que certains types d'animaux. -->

        <!-- Controls Section -->
        <div class="w-full lg:w-142">
          <div class="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-6 border-2 border-pink-100">
            <div class="flex items-center gap-2 mb-6">
              <span class="text-2xl">🐾</span>
              <h2 class="text-2xl font-bold text-gray-800">Reservation</h2>
              <UIcon name="i-lucide-heart" class="w-5 h-5 text-pink-400 fill-pink-400 animate-pulse" />
            </div>

            <CalendarCreateReservationFormStep1>
            </CalendarCreateReservationFormStep1>
            <UButton @click="autofill">Autofill</UButton>

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
import Calendar from '@/utils/Calendar'
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

const autofill = () => {
  const today = new Date();
  const start = convertToDateTime(today).plus({ days: 5 });
  const end = convertToDateTime(today).plus({ days: 50 });

  reservationFormStore.setLabeledEvent(start, end);
  reservationFormStore.lodgerCount = 2;
  reservationFormStore.checked = true;
  reservationFormStore.notes = "demo note for autofill";

};

// Refs
const fullcalendar = ref(null)
const fullCalendarApi = ref(null)
const apiEvents = ref([])
const labeledEvent = ref(new LabeledEvent())
const originalEvents = ref([])

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
    if (labeledEvent.value && labeledEvent.value?.isDefined()) {
      throw 'labeledEvent dateFrom already defined'
    } else {
      apiEvents.value = fullCalendarApi.value.getEvents()
      Calendar.ValidateNoOverlapBusyEvent(arg.date, apiEvents.value)
      const labeledEvent = new LabeledEvent(arg.date)
      console.log("handleDateClick labeledEvent.value", labeledEvent);
      updateSelectedEvent(labeledEvent)
    }
  } catch (err) {
    console.warn(err);
  }
  refreshCalendarEvents()
}

const updateSelectedEvent = (newLabeledEvent) => {
  labeledEvent.value = newLabeledEvent
  refreshCalendarEvents()
}

const handleEventDragStop = (info) => {
  var oldLabeledEvent = labeledEvent.value
  var properEndDate = Calendar.GetProperEndDate(info.event.end, info.event.start)
  var dailyDates = DateFormat.GetDailyDates(DateFormat.GetDateFormatted(info.event.start), DateFormat.GetDateFormatted(properEndDate))
  try {
    apiEvents.value = fullCalendarApi.value.getEvents()
    dailyDates.forEach(dailyDate => Calendar.ValidateNoOverlapBusyEvent(dailyDate, apiEvents.value))
    const labeledEvent = new LabeledEvent(DateFormat.GetDateFormatted(info.event.start), DateFormat.GetDateFormatted(properEndDate))
    console.log("handleEventDragStop labeledEvent.value", labeledEvent);
    updateSelectedEvent(labeledEvent)
  } catch (err) {
    console.warn(err)
    info.revert()
    labeledEvent.value = oldLabeledEvent
  }
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
  reservationFormStore.setTeamName(props.teamName);
  fetchEvents()
  fullCalendarApi.value = fullcalendar.value.getApi()
})
</script>