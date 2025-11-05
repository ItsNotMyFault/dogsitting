<template>
    <div class="reservationDetail">
        <div class="sectionTitle">
            Booking ADMIN Détails
        </div>
        <div class="bloc">
            <IsApproved :isApproved="reservation?.isApproved"></IsApproved>
            Reservation Dates: {{ dates }}
            Reserved on: {{ reservation?.createdAt }}
        </div>
        <div class="bloc">
            Gardien: OUI
            Liste chiens
        </div>
        <div>
            My files
        </div>
        <div class="bloc bloc-images">
            <div v-for="(file, index) in files" :key="file" class="bloc-image bloc-image-dimensions">
                <button class="block-imageButton" @click="removeImage(file, index)">delete</button>
                <InputsImageFileDisplay :file="file.FileData"></InputsImageFileDisplay>
            </div>
            <div v-for="(file, index) in filesToAdd" :key="file" class="bloc-image bloc-image-dimensions">
                <button class="block-imageButton" @click="removeNewImage(index)">remove</button>
                <span class="block-imageNew">New</span>
                <InputsImageFileDisplay :file="file"></InputsImageFileDisplay>
            </div>
            <CardAddButton class="imageFileInput">
                <label class="imageFileInput-container">
                    <input type="file" id="file" @change="updateFiles" multiple>
                </label>
            </CardAddButton>
            <button @click="saveReservationFiles()">SAVE FILES</button>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import reservationServices from '@services/reservationServices.js'
import CardAddButton from '#reservation/components/buttons/CardAddButton.vue'
import IsApproved from '@components/IsApproved.vue'
import InputsImageFileDisplay from '@components/inputs/ImageFileDisplay.vue'

const props = defineProps({
    id: {
        type: String,
        required: true
    }
})

const reservation = ref(null)
const files = ref([])
const filesToAdd = ref([])

const dates = computed(() => reservation.value?.dates)

const removeImage = (file, index) => {
    if (confirm("Are you sure you want to delete this picture?")) {
        reservationServices.deleteReservationFile(props.id, file.Id).then(() => {
            files.value.splice(index, 1)
        })
    }
}

const removeNewImage = (index) => {
    filesToAdd.value.splice(index, 1)
}

const saveReservationFiles = () => {
    reservationServices.saveReservationFiles(props.id, filesToAdd.value)
}

const updateFiles = (event) => {
    filesToAdd.value = [...filesToAdd.value, ...event.target.files]
}

onMounted(async () => {
    reservation.value = await reservationServices.findReservationById(props.id)
    files.value = await reservationServices.getReservationFiles(props.id)
})
</script>