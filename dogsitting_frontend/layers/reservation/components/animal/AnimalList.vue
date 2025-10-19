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
