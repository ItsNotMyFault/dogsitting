<template>
  <div class="demo-app">
    <div class="demo-app-main">
      <FullCalendar :options="calendarOptions"></FullCalendar>
    </div>
  </div>
</template>

<script setup>

import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'

const calendarOptions = {
  plugins: [dayGridPlugin, interactionPlugin],
  initialView: 'dayGridMonth'
}

</script>
