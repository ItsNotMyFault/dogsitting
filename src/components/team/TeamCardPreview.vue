<template>
    <div class="TeamCard">
        <div class="TeamCard-title">Title</div>
        <div class="TeamCard-image">
            <img :src="image1" alt="Image Preview">
        </div>
        <div class="TeamCard-image">
            <img :src="image2" alt="Image Preview">
        </div>
        <div class="TeamCard-image">
            <img :src="image3" alt="Image Preview">
        </div>
        <div class="TeamCard-image">
            <img :src="image4" alt="Image Preview">
        </div>
    </div>
</template>
<script>
import Team from '@/model/team'
export default {
    name: 'TeamCardPreview',

    props: {
        image1: {
            type: [String, null],
            required: true
        },
        image2: {
            type: [String, null],
            required: true
        },
        image3: {
            type: [String, null],
            required: true
        },
        image4: {
            type: [String, null],
            required: true
        }
    },
}
</script>