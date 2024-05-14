<template>
    <div>
        <ReservationList :reservations="reservations" v-if="reservations?.length > 0">
            <template #title>
                Team Reservations
            </template>
        </ReservationList>
        <h1 v-else>
            no reservations
        </h1>
    </div>

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
        if (authStore.getTeamNormalizedName) {
            const reservations = await reservationServices.getReservationsByTeamName(authStore.getTeamNormalizedName);
            this.reservations = reservations
        }


    }


}
</script>