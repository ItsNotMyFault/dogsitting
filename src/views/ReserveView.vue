<template>
  <div class="reserve">
    <h1>This is a calendar page</h1>
    <Calendar></Calendar>
  </div>
</template>
<script>
import Calendar from '@/components/Calendar.vue'
// import Calendar from '../components/calendar.vue'
export default {
  name: 'ReserveView',

  components: [Calendar]
}
</script>