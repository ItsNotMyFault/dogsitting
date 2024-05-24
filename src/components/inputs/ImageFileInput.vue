<template>

    <div class="imageFileInput">
        <div class="imageFileInput-imageName" v-if="modelValue">
            <span class="fileName">{{ fileName }}</span>
        </div>
        <label class="imageFileInput-container">
            <input type="file" id="file" @change="updateFile">
            <span v-if="!modelValue" class="imageFileInput-title">+</span>
        </label>
        <div class="imageFileInput-imagePreview">
            <img v-if="modelValue" :src="modelValue" alt="Image Preview">
        </div>
        <button v-if="modelValue" class="imageFileInput-delete" @click="clearImage()">DELETE</button>
    </div>
</template>

<script>
export default {
    name: 'ImageFileInput',

    props: {
        modelValue: {
            type: [String, null],
            default: null
        }
    },

    data() {
        return {
            fileName: 'No file chosen',
        };
    },
    methods: {
        clearImage() {
            this.fileName = "No file chosen"
            this.$emit('update:modelValue', null)
        },
        updateFile(event) {
            const file = event.target.files[0];
            this.fileName = file ? file.name : 'No file chosen';
            if (file && file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = e => {
                    this.$emit('update:modelValue', e.target.result)
                };
                reader.readAsDataURL(file);
            } else {
                this.$emit('update:modelValue', null)
            }
        }
    }
}

</script>