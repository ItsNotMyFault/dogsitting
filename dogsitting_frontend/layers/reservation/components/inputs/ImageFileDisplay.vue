<template>
    <span>
        <img v-if="file" :src="imageUrl" alt="Image Preview">
    </span>
</template>

<script>

export default {
    name: 'ImageFileDisplay',

    props: {
        file: {
            type: [File, String],
            defautl: null
        },
    },

    data() {
        return {
            imageUrl: null
        };
    },

    watch: {
        file: {
            immediate: true,
            handler(newVal) {
                if (newVal instanceof File) {
                    this.updateFile(newVal);
                } else if (typeof newVal === "string") {
                    this.imageUrl = `data:image/jpeg;base64,${newVal}`;
                }

            }
        },
    },

    methods: {
        async readImageFile(file) {
            if (!file) {
                return
            }
            const fileType = file.type || file.FileType
            if (file && fileType.startsWith('image/')) {
                try {
                    const result = await new Promise((resolve, reject) => {
                        const reader = new FileReader();
                        reader.onload = e => resolve(e.target.result);
                        reader.onerror = e => reject(new Error("File reading error"));
                        reader.readAsDataURL(file);
                    });
                    return result;
                } catch (error) {
                    console.error('Error reading file:', error);
                    return null;
                }
            } else {
                console.warn('file is not an image')
                return null

            }
        },
        async updateFile(file) {
            this.fileName = file ? file.name : 'No file chosen';
            this.imageUrl = await this.readImageFile(file);
            if (this.imageUrl) {
                this.$emit('update:file', file)
            }
        },
    }
}

</script>