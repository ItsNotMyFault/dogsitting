<template>
    <ReservationList :reservations="reservations" v-if="reservations?.length > 0">
        <template #title>
            My Reservations
        </template>
    </ReservationList>
    <h1 v-else>
        no reservations
    </h1>
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
            reservations: [],
            authStore: null
        }
    },

    methods: {
        async fetchReservations() {
            this.reservations = await reservationServices.getReservationsByUserId(this.authStore.getUserId);
        }
    },

    async created() {
        this.authStore = useAuthStore();
        this.fetchReservations()
    }


}
</script>