<template>
    <div class="reservationCard">
        <div class="reservationCard-title">
            <!-- TODO Créer une 2e CARD pour différencier team reservations de réservations d'un client. -->
            <span>Team: {{ reservation.team.name }}</span>
            <span>Client: {{ reservation.client.name }}</span>

            <span>
                created at: <moment-ago :date="reservation.dateFrom"></moment-ago>
            </span>
        </div>
        <div>
            Reservation: {{ reservation.title }} <br>
            lodgerCount: ({{ reservation.lodgerCount }})
        </div>
        <div class="reservationCard-period">
            Periode: {{ reservation.dateFrom }} to {{ reservation.dateTo }}
        </div>
        <div class="reservationCard-notes">
            Notes <br>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. At necessitatibus asperiores non, voluptatem eaque
            illum voluptatibus, est dolor iste similique id natus sequi perferendis quae labore beatae cumque. Mollitia,
            modi.
        </div>
        <div class="reservationCard-footer">
            <span :class="{ 'reservation-approved': isApproved }">
                <!-- TODO: set right daate -->
                approved at: <moment-ago :date="reservation.dateFrom"></moment-ago>
            </span>
        </div>

    </div>
</template>
<script>
import Reservation from '@model/reservation'
import MomentAgo from '@components/MomentAgo.vue'
export default {
    name: 'ReservationCard',

    components: {
        MomentAgo
    },

    props: {
        reservation: {
            type: Reservation,
            required: true
        }
    },

    computed: {
        isApproved() {
            return this.reservation?.approvedAt
        }
    },

    created() {
        console.log('reservation', this.reservation);
    }

}
</script>