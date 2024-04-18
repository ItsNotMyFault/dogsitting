<template>
  <div class="reserve">
    <h1>This is a calendar page</h1>
    <button @click="isAdmin = !isAdmin">{{ isAdmin ? 'Administrator' : 'Client' }}</button>
    <ReserveModal></ReserveModal>
    <AdminCalendar v-if="isAdmin"></AdminCalendar>
    <ClientCalendar v-if="!isAdmin"></ClientCalendar>
  </div>
</template>

<script>
import ReserveModal from '@components/modals/ReserveModal.vue'
import AdminCalendar from '@components/AdminCalendar.vue'
import ClientCalendar from '@components/ClientCalendar.vue'

export default {
  name: 'ReserveView',

  components: { ReserveModal, AdminCalendar, ClientCalendar },

  data() {
    return {
      isAdmin: false
    }
  },

  created() {
    console.log('created reserve', this.$router.currentRoute.value);
  }
}

</script>