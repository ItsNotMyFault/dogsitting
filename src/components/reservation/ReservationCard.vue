<template>
    <div class="reservationCard" @click="navigate()">
        <div class="reservationCard-title">
            <!-- TODO Créer une 2e CARD pour différencier team reservations de réservations d'un client. -->
            <span>Team: {{ reservation.team.name }}</span>
            <span>Client: {{ reservation.client.name }}</span>

            <span>
                created at: <moment-ago :date="reservation.createdAt"></moment-ago>
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
            <span :class="{ 'reservation-approved': isApproved }" v-if="reservation.approvedAt">
                approved at: <moment-ago :date="reservation.approvedAt"></moment-ago>
            </span>
            <span v-else>
                waiting for approval
            </span>
            <slot name="actions"></slot>
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
        },
        isAdmin: {
            type: Boolean,
            default: false
        }
    },

    computed: {
        isApproved() {
            return this.reservation?.isApproved
        }
    },

    methods: {
        navigate() {
            const adminPath = this.isAdmin ? '-admin' : ''
            this.$router.push({ path: `/reservations/${this.reservation.id}/detail${adminPath}` })
        }
    }
}
</script>