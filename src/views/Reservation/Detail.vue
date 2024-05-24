<template>
    <div>
        <div class="sectionTitle">
            {{ id }} / Détails
        </div>
        <div>
            Lister les détails de la réservation
            {{ reservation }}
        </div>
        <div>
            Permettre d'ajouter des images pour une réservations en tant qu'admin de l'équipe.
        </div>
        <ImageFileInput v-model="imageTest" @input="addImage(imageTest)"></ImageFileInput>
        <div v-for="image in images" :key="image">
            <ImageFileInput :model-value="image" @input="addImage(image)"></ImageFileInput>
        </div>
        <!-- TODO, figure out a cute way to add pictures. -->
    </div>
</template>
<script>
import reservationServices from '@services/reservationServices.js'
import ImageFileInput from '@components/inputs/ImageFileInput.vue'
export default {
    name: 'ReservationDetail',

    components: {
        ImageFileInput
    },

    props: {
        id: {
            type: String,
            required: true
        }
    },

    methods: {
        addImage(imageUrl) {
            console.log('imageUrl', imageUrl);
            this.images.push(imageUrl)
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
        const response = await reservationServices.findReservationById(this.id)
        this.reservation = response
    }
}
</script>
