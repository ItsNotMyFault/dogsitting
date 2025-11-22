<template>
    <ButtonsCardAddButton class="imageFileInput text-black">
        <div class="imageFileInput-imageName" v-if="file">
            <span class="fileName ">{{ fileName }}</span>
        </div>

        <label class="imageFileInput-container">
            <input type="file" id="file" @change="updateFiles" />
        </label>

        <div class="imageFileInput-imagePreview">
            <InputsImageFileDisplay :file="file" />
        </div>

        <UButton v-if="file" class="imageFileInput-delete" @click.prevent="clearImage">
            <Icon name="lucide:trash-2" class="w-4 h-4 " />
        </UButton>
    </ButtonsCardAddButton>
</template>

<script setup>

const props = defineProps({
    modelValue: {
        type: [File, String, null],
        default: null
    }
})

const emit = defineEmits(['update:modelValue'])

const file = ref(null)
const fileName = ref('No file chosen')

// Sync incoming v-model → internal state
watch(
    () => props.modelValue,
    (newVal) => {
        file.value = newVal
        fileName.value = newVal ? newVal.name ?? 'File' : 'No file chosen'
    },
    { immediate: true }
)

// Clears the file
function clearImage() {
    file.value = null
    fileName.value = 'No file chosen'
    emit('update:modelValue', null)
}

// Handles file input change
function updateFiles(event) {
    const picked = event.target.files?.[0] || null
    if (picked) {
        updateFile(picked)
    }
}

// Internal update function
function updateFile(newFile) {
    file.value = newFile
    fileName.value = newFile ? newFile.name : 'No file chosen'
    emit('update:modelValue', newFile)
}
</script>
