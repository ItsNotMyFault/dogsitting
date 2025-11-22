<template>
    <UModal v-model:open="open" size="xl" class="max-w-7xl" :title="isEdit ? 'Edit Animal' : 'Create Animal'">
        <template #title>
            <div class="flex items-center gap-3 ">
                <div class="bg-gradient-to-br from-purple-400 to-pink-400 p-3 rounded-2xl">
                    <UIcon name="i-lucide-dog" class="w-8 h-8 text-white" />
                </div>

                <h1
                    class="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    {{ isEdit ? "Edit Animal" : "New Animal" }}
                </h1>

                <UIcon name="i-lucide-sparkles" class="w-6 h-6 text-yellow-400 animate-pulse" />
            </div>
        </template>
        <template #body>
            <AnimalForm :animal="emptyValue"></AnimalForm>
        </template>
        <template #footer>
            <div class="flex justify-end gap-3 pt-4">
                <UButton color="info" variant="soft" @click="closeModal">Cancel</UButton>
                <UButton type="submit" form="animal-form" color="primary" @click="submitForm">Save</UButton>
            </div>
        </template>
    </UModal>
</template>

<script setup lang="ts">
import { emptyValue } from '@/model/AnimalType'

const props = defineProps({
    open: {
        type: Boolean,
        required: true
    },
    isEdit: {
        type: Boolean,
        default: false
    },
    id: {
        type: String,
        required: false
    }
})

// Emits
const emit = defineEmits(['update:open', 'submit'])

// Local modal state (v-model)
const open = ref(props.open)
watch(() => props.open, val => open.value = val)
watch(open, val => emit('update:open', val))


// Close button
function closeModal() {
    open.value = false
}
</script>
