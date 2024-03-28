<template>
  <div class="reserve">
    <Modal v-show="isModalVisible" @close="isModalVisible = false">
      <template v-slot:header>
        This is a new modal header.
      </template>

      <template v-slot:body>
        <label>date start</label>
        <input />
        <label>date end</label>
        <input />
        <label>Nom du proprio</label>
        <input />
        <label>Nom du pensionnaire</label>
        <input />
        This is a new modal body.
      </template>

      <template v-slot:footer>
        This is a new modal footer.
      </template>
    </Modal>
    <h1>This is a calendar page</h1>
    <button @click="isModalVisible = true">modal open {{ isModalVisible }}</button>
    <ReserveCalendar></ReserveCalendar>
  </div>
</template>
<script setup>
import Modal from '../components/modals/Modal.vue'
import ReserveCalendar from '../components/ReserveCalendar.vue'
import { ref } from 'vue'
let isModalVisible = ref(false)
</script>