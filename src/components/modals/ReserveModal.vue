<template>
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
    <button @click="isModalVisible = true">modal open {{ isModalVisible }}</button>
</template>
<script>
import Modal from '../modals/Modal.vue'
export default {
    name: 'TheReserveModal',

    components: { Modal },

    data() {
        return {
            isModalVisible: true
        }
    },
}
</script>