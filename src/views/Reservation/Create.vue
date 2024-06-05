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
import AnimalForm from '@/components/animal/AnimalForm.vue'
import Animal from '@model/animal'
import animalServices from '@services/animalServices'
import { useAuthStore } from '@/stores/authStore'

export default {
    name: 'ReservationCreateView',

    components: {
        AnimalForm
    },

    methods: {
        save(animal) {
            console.log('animal', animal);

            animalServices.create(animal, animal.media).then(response => {
                console.log('response', response);
                this.saving = false
            });
        }
    },

    data() {
        return {
            animal: new Animal(),
            user: null
        }
    },

    async created() {
        const authStore = useAuthStore();
        this.user = authStore.applicationUser;
    }


}
</script>