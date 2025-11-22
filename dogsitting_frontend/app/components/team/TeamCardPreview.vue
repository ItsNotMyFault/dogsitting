<template>
    <div class="TeamCard">
        <div class="TeamCard-title">Title</div>
        <div class="TeamCard-image">
            <ImageFileDisplay :file="image1">
            </ImageFileDisplay>
        </div>
        <div class="TeamCard-image">
            <ImageFileDisplay :file="image2">
            </ImageFileDisplay>
        </div>
        <div class="TeamCard-image">
            <ImageFileDisplay :file="image3">
            </ImageFileDisplay>
        </div>
        <div class="TeamCard-image">
            <ImageFileDisplay :file="image4">
            </ImageFileDisplay>
        </div>
    </div>
</template>
<script setup lang="ts">
import ImageFileDisplay from '../inputs/ImageFileDisplay.vue';


const props = defineProps({
    image1: {
        type: [String, null, File],
        required: true
    },
    image2: {
        type: [String, null, File],
        required: true
    },
    image3: {
        type: [String, null, File],
        required: true
    },
    image4: {
        type: [String, null, File],
        required: true
    }
});
</script>