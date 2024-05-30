<template>
    <div class="reservationDetail">
        <div class="sectionTitle">
            Booking Détails
        </div>
        <div class="bloc">
            Dates: {{ dates }}
        </div>
        <div class="bloc">
            Gardien: {{ reservation.team }}
            Lister les détails de la réservation
        </div>
        <div class="bloc">
            Chiens: {{ reservation.team }}
            Lister les détails de la réservation
        </div>
        <div>
            Reservation's pictures
        </div>

        <div style="display: flex; flex-direction: row; flex-wrap: wrap;">
            <ImageFileInput @update:model-value="addImage" style="width: 50px"></ImageFileInput>
            <div v-for="image in images" :key="image">
                <img :src="image" alt="Image Preview" style="width: 50px; height: 50px;">
            </div>
        </div>
        <button> Cancel</button>
    </div>
</template>

<script>
import reservationServices from '@services/reservationServices.js'
import ImageFileInput from '@components/inputs/ImageFileInput.vue'
import CardAddButton from '@components/buttons/CardAddButton.vue'
import IsApproved from '@components/IsApproved.vue'

export default {
    name: 'ReservationForm',

    components: {
        ImageFileInput,
        CardAddButton,
        IsApproved
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
        }
    },

    methods: {
        addImage(imageUrl) {
            this.images.push(imageUrl)
        },
        navigate() {
            this.$router.push({ path: `/teams/create` })
        }
    },

    data() {
        return {
            reservation: null,
            images: [],
            imageTest: null
        }
    },

    async created() {
        this.reservation = await reservationServices.findReservationById(this.id)
    }
}
</script>
