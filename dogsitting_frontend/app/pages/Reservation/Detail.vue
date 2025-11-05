<template>
    <div class="reservationDetail">
        <div class="sectionTitle">
            Booking CLIENT Détails
        </div>
        <div class="bloc">
            <IsApproved :isApproved="reservation.isApproved"></IsApproved>
            Reservation Dates: {{ dates }}
            Reserved on: {{ reservation.createdAt }}
        </div>
        <div class="bloc">
            Gardien: OUI
        </div>
        <div class="bloc">
            Chiens: Liste de chiens ici
        </div>
        <div class="bloc">
            <button> Cancel</button>
        </div>
        <div>
            Reservation's pictures ({{ imageCount }})
            <button v-if="imageCount > 0" @click="loadPictures()"> Click to load pictures</button>
        </div>
    </div>
</template>

<script>
import reservationServices from '@services/reservationServices.js'
import ImageFileInput from '@components/inputs/ImageFileInput.vue'
import CardAddButton from '#reservation/components/buttons/CardAddButton.vue'
import IsApproved from '@components/IsApproved.vue'

export default {
    name: 'ReservationDetail',

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
        },
        contactInfo() {
            return 'phone: 5345-345-6556'
        }
    },

    methods: {
        loadPictures() {
            //axios call to fetch resrvation's pictures
        },
        addImage(imageUrl) {
            this.images.push(imageUrl)
        },
        navigate() {
            this.$router.push({ path: `/team/create` })
        }
    },

    data() {
        return {
            reservation: null,
            images: [],
            imageTest: null,
            imageCount: 6
        }
    },

    async created() {
        this.reservation = await reservationServices.findReservationById(this.id)
    }
}
</script>
