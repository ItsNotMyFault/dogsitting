<template>
    <div class="relative">
        <!-- File Input Area -->
        <label class="block cursor-pointer transition-all duration-200 hover:opacity-80"
            :class="file ? 'border-2 border-green-500 rounded-lg' : ''">
            <input type="file" class="hidden" @change="updateFiles" accept="image/*" />

            <!-- Preview Mode -->
            <div v-if="preview && file" class="relative">
                <InputsImageFileDisplay :file="file" />
            </div>

            <!-- Non-Preview Mode with Checkmark -->
            <div v-else-if="!preview && file"
                class="flex items-center justify-center p-4 bg-green-50 border-2 border-green-500 rounded-lg min-h-[120px]">
                <div class="text-center space-y-2 w-full px-2">
                    <div class="flex justify-center">
                        <div class="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                            <Icon name="lucide:check" class="w-5 h-5 text-white" />
                        </div>
                    </div>
                    <p class="text-sm font-medium text-green-700 truncate" :title="fileName">{{ fileName }}</p>
                    <p class="text-xs text-green-600">File selected</p>
                </div>
            </div>

            <!-- No File Selected -->
            <div v-else
                class="flex flex-col items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors bg-gray-50 min-h-[120px]">
                <Icon name="lucide:upload" class="w-6 h-6 text-gray-400 mb-2" />
                <p class="text-sm font-medium text-gray-700">Choose a file</p>
                <p class="text-xs text-gray-500 mt-1">or drag and drop</p>
            </div>
        </label>

        <!-- Delete Button -->
        <UButton v-if="file" color="red" variant="solid" size="md" icon="i-heroicons-trash"
            class="absolute top-2 right-2 z-10" @click.prevent="clearImage" />

        <!-- File Name Display (when not in preview) -->
        <div v-if="file && !preview" class="mt-2 text-xs text-gray-600 text-center truncate px-2">
            Click to change file
        </div>
    </div>
</template>

<script setup>

const props = defineProps({
    modelValue: {
        type: [File, String, null],
        default: null
    },
    preview: {
        type: Boolean,
        default: true
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