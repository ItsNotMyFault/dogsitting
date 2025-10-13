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
                <ImageFileDisplay :file="file.FileData"></ImageFileDisplay>
            </div>
            <div v-for="(file, index) in filesToAdd" :key="file" class="bloc-image bloc-image-dimensions">
                <button class="block-imageButton" @click="removeNewImage(index)">remove</button>
                <span class="block-imageNew">New</span>
                <ImageFileDisplay :file="file"></ImageFileDisplay>
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

<script>
import reservationServices from '@services/reservationServices.js'
import ImageFileInput from '@components/inputs/ImageFileInput.vue'
import CardAddButton from '#reservation/components/buttons/CardAddButton.vue'
import IsApproved from '@components/IsApproved.vue'
import ImageFileDisplay from '@components/inputs/ImageFileDisplay.vue'

export default {
    name: 'ReservationDetailAdmin',

    components: {
        ImageFileInput,
        CardAddButton,
        IsApproved,
        ImageFileDisplay
    },

    props: {
        id: {
            type: String,
            required: true
        }
    },

    computed: {
        dates() {
            return this.reservation?.dates
        },
    },

    methods: {
        removeImage(file, index) {
            if (confirm("Are you sure you want to delete this picture?")) {
                reservationServices.deleteReservationFile(this.id, file.Id).then(response => {
                    this.files.splice(index, 1);
                })
            }

        },
        removeNewImage(index) {
            this.filesToAdd.splice(index, 1);
        },
        async saveReservationFiles() {
            reservationServices.saveReservationFiles(this.id, this.filesToAdd)
        },
        async updateFiles(event) {
            this.filesToAdd = [...this.filesToAdd, ...event.target.files];
        },
        navigate() {
            this.$router.push({ path: `/teams/create` })
        }
    },

    data() {
        return {
            reservation: null,
            files: [],
            filesToAdd: []
        }
    },

    async created() {
        this.reservation = await reservationServices.findReservationById(this.id)
        this.files = await reservationServices.getReservationFiles(this.id)
    }
}
</script>
