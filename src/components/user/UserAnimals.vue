<template>
    <div>
        user animals list
        <div class="bloc" v-for="animal in animals" :key="animal.id">
            name: {{ animal.name }} <br>
            IImage =>
            <div class="imageFileInput-imagePreview">
                <ImageFileDisplay class="animalPicture" :file="animal.media.FileData"></ImageFileDisplay>
            </div>
            <RouterLink :to="`/animals/${animal.id}/edit`">Edit Animal</RouterLink>
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
<style>
.animalPicture {
    position: absolute;
    top: 50%;
    left: 50%;
    object-fit: cover;
    width: 100px;
    height: 100px !important;
}
</style>