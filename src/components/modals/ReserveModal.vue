<template>
    <Modal v-show="isModalVisible" @close="isModalVisible = false">
        <template v-slot:header>
            This is a new modal header.
        </template>

        <template v-slot:body>
            <label>date start</label>
            <Datepicker v-model="event.start" />
            <label>date end</label>
            <Datepicker v-model="event.end" />
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
    <button @click="isModalVisible = true">modal open => {{ isModalVisible }}</button>
</template>
<script>
import Modal from '../modals/Modal.vue'
import Datepicker from '@vuepic/vue-datepicker';
import Event from '../../model/event'
import '@vuepic/vue-datepicker/dist/main.css';
export default {
    name: 'ReserveModal',

    components: { Modal, Datepicker },

    data() {
        return {
            isModalVisible: false,
            event: new Event(),
        }
    },
}
</script>