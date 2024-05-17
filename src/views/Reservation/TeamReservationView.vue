<template>
    <div>
        <ReservationList :reservations="reservations" v-if="reservations?.length > 0" @refresh="fetchReservations"
            :isAdmin="isAdmin" is-admin>
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
            reservations: [],
            authStore: null,
            isAdmin: false
        }
    },

    methods: {
        async fetchReservations() {
            if (this.authStore.getTeamNormalizedName) {
                const reservations = await reservationServices.getReservationsByTeamName(this.authStore.getTeamNormalizedName);
                this.reservations = reservations
            }
        }
    },

    async created() {
        this.authStore = useAuthStore();
        this.isAdmin = this.authStore.getIsSuperAdmin
        this.fetchReservations()


    }


}
</script>