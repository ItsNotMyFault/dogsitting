<template>
    <div>
        Reservation CREATE
        <ReservationForm @submit="save"></ReservationForm>
    </div>
</template>

<script>
// Séparer ClientCalendar pour emit des dates.
// => Recevoir ces dates dans une View TeamPresentationView.
// après avoir cliquer sur le bouton réserver => dépalcer utilisateur vers Reservation/Create
//REservation form va gérer la création d'un réservation avec dates précédemment choisies et # de chiens
//Add reservation form.
//faire la logique pour créer une réservation avec les bon chiens associé
//Créer la Réservation pour l'équipe désiré.
import ReservationForm from '@/components/reservation/ReservationForm.vue'
import { useReservationFormStore } from '@/stores/reservationFormStore'
import { useAuthStore } from '@/stores/authStore'

export default {
    name: 'ReservationCreateView',


    props: {
        teamName: {
            type: String,
            required: true
        }
    },

    components: {
        ReservationForm
    },

    methods: {
        save(reservation) {
            console.log('save reservation', reservation);
            const reservationFormStore = useReservationFormStore()
            console.log('this.teamName', this.teamName);
            reservationFormStore.createReservation(reservation, this.teamName).then(response => {
                console.log('response', response);
                this.saving = false
                //if reservation reated with success => redirect to 'my reservations'
                //this.$router.push({ path: `/my-reservations` })
            });
        }
    },

    data() {
        return {
            user: null
        }
    },

    async created() {
        const authStore = useAuthStore();
        this.user = authStore.applicationUser;
    }


}
</script>