<template>
    <div>
        animal CREATE
        <AnimalForm :animal="animal" @submit="save"></AnimalForm>
    </div>
</template>

<script>
import AnimalForm from '@/components/animal/AnimalForm.vue'
import Animal from '@model/animal'
import animalServices from '@services/animalServices'
import { useAuthStore } from '@/stores/authStore'

export default {
    name: 'AnimalCreateView',

    components: {
        AnimalForm
    },

    methods: {
        save(animal) {
            animalServices.create(animal, animal.media).then(response => {
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