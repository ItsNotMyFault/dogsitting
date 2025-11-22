<template>
    <div class="p-6 max-w-5xl mx-auto text-black">
        <h1 class="text-3xl font-bold text-center text-green-400 mb-6">Liste Animaux</h1>

        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <UCard v-for="animal in localAnimals" :key="animal.id" @click="toggleSelect(animal.id)" :class="[
                'cursor-pointer relative overflow-hidden rounded-3xl backdrop-blur-md transition-all duration-300 border-2 shadow-lg',
                'bg-gradient-to-br from-purple-200 to-pink-200 hover:bg-white/90',
                selectedIds.includes(animal.id)
                    ? 'border-pink-300 shadow-pink-200 ring-2 ring-pink-300 scale-[1.02]'
                    : 'border-purple-100 hover:shadow-xl hover:-translate-y-1'
            ]">
                <!-- Checkmark Overlay -->
                <div v-if="selectedIds.includes(animal.id)"
                    class="absolute z-10 top-3 right-3 bg-gradient-to-br from-pink-400 to-purple-400 text-white rounded-full w-8 h-8 flex items-center justify-center shadow-md">
                    ✓
                </div>

                <!-- Image -->
                <div class="relative h-48 w-full overflow-hidden rounded-t-3xl">
                    <InputsImageFileDisplay v-if="animal.media" :file="animal.media?.fileData"
                        class="w-full h-full object-cover" />
                    <div v-else
                        class="flex items-center justify-center h-full bg-purple-200/40 text-purple-500 text-sm">
                        Pas d’image
                    </div>
                </div>

                <!-- Info -->
                <div class="p-5">
                    <h3
                        class="text-lg font-bold mb-1 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        {{ animal.name }}
                    </h3>

                    <p class="text-sm text-gray-600">{{ animal.species }} • {{ animal.weightkg }} kg</p>
                    <p class="text-sm text-gray-600">{{ animal?.gender }}</p>

                    <p class="text-sm text-gray-700 mt-3 opacity-80 line-clamp-3">
                        {{ animal.notes }}
                    </p>
                </div>
            </UCard>
            <!-- <UCard @click="$emit('create')" -->
            <UCard @click="showAnimalFormModal = true"
                class=" cursor-pointer relative flex items-center justify-center overflow-hidden rounded-3xl backdrop-blur-md transition-all duration-300 border-2 shadow-lg bg-gradient-to-br from-purple-200 to-pink-200 hover:scale-[1.03] hover:shadow-xl hover:brightness-105 border-purple-200 ">
                <div
                    class=" text-6xl font-bold bg-gradient-to-br from-pink-500 to-purple-600 bg-clip-text text-transparent drop-shadow-md select-none transition-transform duration-300 group-hover:scale-110 ">
                    +
                </div>
            </UCard>
            showAnimalFormModal: {{ showAnimalFormModal }}
            <AnimalFormModal v-model:open="showAnimalFormModal" :isEdit="false" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import type { AnimalType } from '@/model/AnimalType'

const props = defineProps({
    animals: {
        type: Array as PropType<AnimalType[]>,
        required: true,
    },
    // v-model:selected
    selected: {
        type: Array as PropType<string[]>,
        default: () => []
    }
})

const emit = defineEmits(['update:selected', 'create'])

const localAnimals = ref<AnimalType[]>([])
const selectedIds = ref<string[]>(props.selected)
const showAnimalFormModal = ref<boolean>(false)
const router = useRouter()

// Keep UI in sync if parent updates selected array
watch(() => props.selected, newVal => {
    selectedIds.value = newVal
})

// Sync animals list
watch(() => props.animals, newAnimals => {
    localAnimals.value = newAnimals
}, { immediate: true })

// Toggle selection of one animal
const toggleSelect = (id: string) => {
    if (selectedIds.value.includes(id)) {
        selectedIds.value = selectedIds.value.filter(x => x !== id)
    } else {
        selectedIds.value.push(id)
    }

    // Emit updated list to parent
    emit('update:selected', selectedIds.value)
}
</script>
