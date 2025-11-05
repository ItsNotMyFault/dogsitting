<template>
    <div>
        <h1 v-if="loading">Loading...</h1>
        <div v-else>
            <h2>Animal UPDATE</h2>
            <AnimalForm :animal="animal" @submit="save" :is-edit="true"></AnimalForm>
        </div>
    </div>
</template>

<script>
import AnimalForm from '@/components/animal/AnimalForm.vue'
import Animal from '@model/animal'
import animalServices from '@services/animalServices'
import { useAuthStore } from '@/stores/authStore'

export default {
    name: 'AnimalUpdateView',

    props: {
        id: {
            type: String,
            required: true
        }
    },

    components: {
        AnimalForm
    },

    methods: {
        save(animal) {
            animalServices.update(animal.id, animal, animal.media.FileData).then(response => {
                console.log('response', response);
                this.saving = false
                this.$router.go(-1)
            });
        }
    },

    data() {
        return {
            animal: new Animal(),
            user: null,
            loading: true,
        }
    },

    async created() {
        try {
            const authStore = useAuthStore();
            this.user = authStore.applicationUser;
            this.animal = await animalServices.findById(this.id);
        } catch (error) {
            console.error('Error fetching animal:', error);
        } finally {
            this.loading = false;
        }
    }


}
</script>