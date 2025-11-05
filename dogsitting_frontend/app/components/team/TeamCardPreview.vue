<template>
    <div class="TeamCard">
        <div class="TeamCard-title">Title</div>
        <div class="TeamCard-image">
            <InputsImageFileDisplay :file="image1">
            </InputsImageFileDisplay>
        </div>
        <div class="TeamCard-image">
            <InputsImageFileDisplay :file="image2">
            </InputsImageFileDisplay>
        </div>
        <div class="TeamCard-image">
            <InputsImageFileDisplay :file="image3">
            </InputsImageFileDisplay>
        </div>
        <div class="TeamCard-image">
            <InputsImageFileDisplay :file="image4">
            </InputsImageFileDisplay>
        </div>
    </div>
</template>
<script>
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