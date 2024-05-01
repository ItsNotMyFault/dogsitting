<template>
    <ReservationList :reservations="reservations">
        <template #title>
            Team Reservations
        </template>
    </ReservationList>
</template>
<script>
import ReservationList from '@components/ReservationList.vue';
import reservationServices from '@services/reservationServices'
import { useAuthStore } from '@/stores/authStore'
export default {
    name: 'TeamReservationView',

    components: {
        ReservationList,
    },

    data() {
        return {
            reservations: []
        }
    },

    async created() {
        const authStore = useAuthStore();
        console.log('authStore.$state team ', authStore.$state);
        const reservations = await reservationServices.getTeamReservations(authStore.getTeamName);
        this.reservations = reservations
    }


}
</script>