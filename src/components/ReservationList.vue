<template>
    <div>
        <div class="sectionTitle">
            Reservations ({{ reservationCount }})
        </div>
        <div style="display: flex; flex-direction: column;">
            <ReservationCard :reservation="reservation" v-for="reservation in reservations" :key="reservation" />
        </div>
    </div>
</template>
<script>
import ReservationCard from '@/components/ReservationCard.vue'
import reservationServices from '@services/reservationServices'

export default {
    name: 'ReservationList',

    props: {

    },

    components: {
        ReservationCard
    },

    computed: {
        reservationCount() {
            return this.reservations?.length
        }
    },

    data() {
        return {
            reservations: []
        }
    },

    methods: {

    },

    async created() {
        console.log('Created');
        const reservations = await reservationServices.getUserReservations();
        this.reservations = reservations
        console.log('reservations', reservations);
        //get all reservations
    }
}
</script>