<template>
    <div class="p-6 max-w-5xl mx-auto">
        <h1 class="text-3xl font-bold text-center text-green-400 mb-6">Liste Animaux</h1>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div v-for="animal in animals" :key="animal.id"
                class="bg-gray-800 text-white rounded-2xl shadow-lg overflow-hidden border border-gray-700 hover:shadow-2xl transition-transform duration-300 hover:-translate-y-1">
                <!-- Image -->
                <div class="relative h-48 w-full overflow-hidden">
                    <!-- <InputsImageFileDisplay v-if="animal.media" :file="animal.media?.FileData" -->
                    <InputsImageFileDisplay v-if="animal.media" :file="animal.media?.FileData"
                        class="w-full h-full object-cover" />
                    <div v-else class="flex items-center justify-center h-full bg-gray-700 text-gray-400 text-sm">
                        Pas d’image
                    </div>
                </div>

                <!-- Info -->
                <div class="p-4">
                    <h3 class="text-lg font-bold mb-1 truncate">{{ animal.name }}</h3>
                    <p class="text-sm text-gray-300">{{ animal.species }} • {{ animal.weightkg }} kg</p>
                    <p class="text-sm text-gray-400 mt-2 line-clamp-3">{{ animal.notes }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
    animals: {
        type: Array,
        required: true,
    },
})
</script>
