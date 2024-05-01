<template>
    <div>
        <div class="sectionTitle">
            <slot name="title">
                Reservations
            </slot> ({{ reservationCount }})
        </div>
        <div style="display: flex; flex-direction: column;">
            <ReservationCard :reservation="reservation" v-for="reservation in reservations" :key="reservation" />
        </div>
    </div>
</template>
<script>
import ReservationCard from '@/components/ReservationCard.vue'

export default {
    name: 'ReservationList',

    props: {
        reservations: {
            type: Array,
            required: true
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
}
</script>