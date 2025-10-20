<template>
    <CardAddButton class="imageFileInput">
        <div class="imageFileInput-imageName" v-if="file">
            <span class="fileName"> {{ fileName }}</span>
        </div>
        <label class="imageFileInput-container">
            <input type="file" id="file" @change="updateFiles">
        </label>
        <div class="imageFileInput-imagePreview">
            <InputsImageFileDisplay :file="file">
            </InputsImageFileDisplay>
        </div>
        <button v-if="file" class="imageFileInput-delete" @click="clearImage()">DELETE</button>
    </CardAddButton>
</template>

<script>
import CardAddButton from '#reservation/components/buttons/CardAddButton.vue'
import ImageFileDisplay from '@components/inputs/ImageFileDisplay.vue'
export default {
    name: 'ImageFileInput',

    components: {
        CardAddButton,
        ImageFileDisplay
    },


    props: {
        modelValue: {
            type: [File, String, null],
            default: null
        }
    },

    watch: {
        modelValue: {
            immediate: true,
            handler(newVal) {
                this.file = newVal;
            }
        },
    },

    data() {
        return {
            fileName: 'No file chosen',
            file: null,
            imageUrl: null
        };
    },
    methods: {
        clearImage() {
            this.fileName = "No file chosen"
            this.file = null
            this.$emit('update:modelValue', null)
        },
        async updateFiles(event) {
            const file = event.target.files[0];
            this.updateFile(file)
        },
        async updateFile(file) {
            this.file = file
            this.fileName = file ? file.name : 'No file chosen';
            this.$emit('update:modelValue', file)
        },
    },
}

</script>