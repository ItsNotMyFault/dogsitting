<template>
    <div>
        animal UPDATE
        <AnimalForm :animal="animal" @submit="save" is-edit></AnimalForm>
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
            //TODO : make update call
            // animalServices.update(animal, animal.media).then(response => {
            //     console.log('response', response);
            //     this.saving = false
            // });
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
        this.animal = await animalServices.findById(this.id)
        console.log('this.animal', this.animal);
        //fetch 
    }


}
</script>