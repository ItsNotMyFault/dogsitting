<template>
    <div class="TeamCard">
        <div class="TeamCard-title">Title</div>
        <div class="TeamCard-image">
            <ImageFileDisplay :file="image1"></ImageFileDisplay>
        </div>
        <div class="TeamCard-image">
            <ImageFileDisplay :file="image2"></ImageFileDisplay>
        </div>
        <div class="TeamCard-image">
            <ImageFileDisplay :file="image3"></ImageFileDisplay>
        </div>
        <div class="TeamCard-image">
            <ImageFileDisplay :file="image4"></ImageFileDisplay>
        </div>
    </div>
</template>
<script>
import ImageFileDisplay from '@components/inputs/ImageFileDisplay.vue'
export default {
    name: 'TeamCardPreview',

    components: {
        ImageFileDisplay
    },

    props: {
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
    },
}
</script>