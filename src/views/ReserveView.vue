<template>
  <div class="reserve">
    <h1>This is a calendar page</h1>
    <ReserveModal></ReserveModal>
    <ReserveCalendar></ReserveCalendar>
  </div>
</template>

<script>
import ReserveModal from '../components/modals/ReserveModal.vue'
import ReserveCalendar from '../components/ReserveCalendar.vue'

export default {
  name: 'ReserveView',

  components: { ReserveModal, ReserveCalendar }
}

</script>