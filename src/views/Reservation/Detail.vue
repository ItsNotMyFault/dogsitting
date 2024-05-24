<template>
    <div>
        <div class="sectionTitle">
            {{ id }} / Détails
        </div>
        <div>
            Lister les détails de la réservation
        </div>
        <div>
            Permettre d'ajouter des images pour une réservations en tant qu'admin de l'équipe.
        </div>
    </div>
</template>
<script>
import reservationServices from '@services/reservationServices.js'

export default {
    name: 'ReservationDetail',

    props: {
        id: {
            type: String,
            required: true
        }
    },

    data() {
        return {
            reservation: null
        }
    },

    async created() {
        const response = await reservationServices.findReservationById(this.id)
        this.reservation = response
    }
}
</script>
