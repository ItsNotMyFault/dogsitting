<template>
    <ReservationList :reservations="reservations">
        <template #title>
            My Reservations
        </template>
    </ReservationList>
</template>
<script>
import ReservationList from '@components/ReservationList.vue';
import reservationServices from '@services/reservationServices'
import { useAuthStore } from '@/stores/authStore'
export default {
    name: 'MyProfileView',

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
        const reservations = await reservationServices.getReservationsByUserId(authStore.getUserId);
        this.reservations = reservations
    }


}
</script>