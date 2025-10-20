<template>
    <span>
        <img v-if="file" :src="imageUrl" alt="Image Preview">
    </span>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits } from 'vue'

const props = defineProps({
    file: {
        type: [File, String],
        default: null
    }
})

const emits = defineEmits(['update:file'])

const imageUrl = ref(null)

const readImageFile = async (file) => {
    if (!file) return
    const fileType = file.type || file.FileType
    if (file && fileType.startsWith('image/')) {
        try {
            return await new Promise((resolve, reject) => {
                const reader = new FileReader()
                reader.onload = e => resolve(e.target.result)
                reader.onerror = () => reject(new Error("File reading error"))
                reader.readAsDataURL(file)
            })
        } catch (error) {
            console.error('Error reading file:', error)
            return null
        }
    } else {
        console.warn('file is not an image')
        return null
    }
}

const updateFile = async (file) => {
    imageUrl.value = await readImageFile(file)
    if (imageUrl.value) {
        emits('update:file', file)
    }
}

// Watch file with immediate execution
watch(() => props.file, (newVal) => {
    if (newVal instanceof File) {
        updateFile(newVal)
    } else if (typeof newVal === "string") {
        imageUrl.value = `data:image/jpeg;base64,${newVal}`
    }
}, { immediate: true })
</script>