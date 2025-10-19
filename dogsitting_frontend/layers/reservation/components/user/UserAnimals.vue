<template>
    <div>
        user animals list
        <div class="bloc" v-for="animal in animals" :key="animal.id">
            name: {{ animal.name }} <br>
            IImage =>
            <div class="imageFileInput-imagePreview">
                <ImageFileDisplay v-if="animal.media" class="animalPicture" :file="animal.media.FileData">
                </ImageFileDisplay>
            </div>
            <RouterLink :to="`/animal/${animal.id}/edit`">Edit Animal</RouterLink>
        </div>
    </div>
</template>

<script>
import userServices from '@/services/userServices'
import ImageFileDisplay from '@components/inputs/ImageFileDisplay.vue'

export default {
    name: 'UserAnimals',

    components: {
        ImageFileDisplay
    },

    props: {
        userId: {
            type: String,
            required: true
        }
    },

    data() {
        return {
            animals: []
        }
    },

    async created() {
        this.animals = await userServices.getUserAnimals(this.userId)
    }


}
</script>