<template>
    <div>
        <div class="sectionTitle">
            <slot name="title">
                Reservations
            </slot> ({{ reservationCount }})
        </div>
        <div style="display: flex; flex-direction: column;">
            <ReservationCard :reservation="reservation" v-for="reservation in reservations" :key="reservation">
                <template #actions v-if="!reservation.isApproved && isAdmin">
                    <button @click="approve(reservation)">Approve</button>
                    <button @click="remove(reservation)">Delete</button>
                </template>
            </ReservationCard>
        </div>
    </div>
</template>
<script>
import ReservationCard from '@/components/reservation/ReservationCard.vue'
import reservationServices from '@/services/reservationServices.js'

export default {
    name: 'ReservationList',

    props: {
        reservations: {
            type: Array,
            required: true
        },
        isAdmin: {
            type: Boolean,
            default: false
        }
    },

    components: {
        ReservationCard
    },

    computed: {
        reservationCount() {
            return this.reservations?.length
        }
    },

    methods: {
        async approve(reservation) {
            if (confirm(`Are you sure you want to approve this reservation ${reservation.dates} for ${reservation.title}?`)) {
                await reservationServices.approveReservation(reservation.id)
                this.$emit('refresh')
            }
        },
        async remove(reservation) {
            if (confirm(`Are you sure you want to delete this reservation ${reservation.dates} for ${reservation.title}?`)) {
                await reservationServices.deleteReservation(reservation.id)
                this.$emit('refresh')
            }
        }
    }
}
</script>