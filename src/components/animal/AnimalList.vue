<template>
    <div v-for="animal in animals">
        <div class="animalSelect-option">
            <ImageFileDisplay v-if="animal.data.media" :file="animal.data.media.FileData"></ImageFileDisplay>
            {{ animal.label }}
        </div>

    </div>
</template>

<script>
import ImageFileDisplay from '@components/inputs/ImageFileDisplay.vue'

export default {
    name: 'AnimalList',

    components: {
        ImageFileDisplay
    },

    props: {
        animals: Array
    },


}
</script>
<style>
.animalSelect-option {
    display: flex;
    align-items: center;
}

.animalSelect-option img {
    width: 230px;
    height: auto;
    /* Maintain aspect ratio */
    object-fit: cover;
    /* Ensures the image covers the set dimensions without distortion */
    margin-right: 10px;
    /* Space between image and text */
}
</style>