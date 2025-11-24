<template>
    <div class="min-h-screen bg-default p-6 md:p-10">
        <div class="max-w-5xl mx-auto">

            <!-- FORM CARD -->
            <div class="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-6 md:p-10 border-2 border-purple-200">

                <!-- FORM -->
                <UForm id="animal-form" :state="animalCopy" class="space-y-8" @submit="submitForm">

                    <!-- 2-COLUMN RESPONSIVE GRID -->
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-10">

                        <!-- IMAGE COLUMN -->
                        <div class="flex flex-col">
                            <UFormField label="Photo">
                                <template #label>
                                    <span class="text-base font-semibold text-gray-800">Photo</span>
                                </template>
                                <div
                                    class="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border-2 border-purple-200 shadow-md p-6 flex justify-center items-center min-h-[300px]">

                                    <div class="w-full max-w-xs flex flex-col items-center gap-4">
                                        <ImageFileInput v-if="!isEdit" v-model="animalCopy.media" />
                                        <ImageFileInput v-else v-model="animalCopy.media.FileData" />

                                        <p class="text-sm text-gray-700 text-center font-medium">
                                            Upload a photo of the animal
                                        </p>
                                    </div>

                                </div>
                            </UFormField>
                        </div>

                        <!-- FIELDS COLUMN -->
                        <div class="flex flex-col gap-6">

                            <UFormField label="Name" name="name" required>
                                <template #label>
                                    <span class="text-base font-semibold text-gray-800">Name <span
                                            class="text-red-500">*</span></span>
                                </template>
                                <UInput v-model="animalCopy.name" size="lg"
                                    class="[&_input]:text-gray-900 [&_input]:font-medium w-full"
                                    placeholder="Enter animal name" />
                            </UFormField>

                            <UFormField label="Birthdate" name="birthdate">
                                <template #label>
                                    <span class="text-base font-semibold text-gray-800">Birthdate</span>
                                </template>
                                <div class="bg-white p-3 rounded-xl border-2 border-purple-200 shadow-sm">
                                    <DatePicker class="w-full" v-model="animalCopy.birthdate" format="yyyy-MM-dd"
                                        auto-apply>
                                    </DatePicker>
                                </div>
                            </UFormField>

                            <UFormField label="Species" name="species" required>
                                <template #label>
                                    <span class="text-base font-semibold text-gray-800">Species <span
                                            class="text-red-500">*</span></span>
                                </template>
                                <UInput v-model="animalCopy.species" size="lg"
                                    class="[&_input]:text-gray-900 [&_input]:font-medium w-full"
                                    placeholder="e.g., Dog, Cat, Bird" />
                            </UFormField>

                            <UFormField label="Breed" name="breed">
                                <template #label>
                                    <span class="text-base font-semibold text-gray-800">Breed</span>
                                </template>
                                <UInput v-model="animalCopy.breed" size="lg"
                                    class="[&_input]:text-gray-900 [&_input]:font-medium w-full"
                                    placeholder="Enter breed" />
                            </UFormField>

                            <UFormField label="Gender" name="gender">
                                <template #label>
                                    <span class="text-base font-semibold text-gray-800">Gender</span>
                                </template>
                                <UInput v-model="animalCopy.gender" size="lg"
                                    class="[&_input]:text-gray-900 [&_input]:font-medium w-full"
                                    placeholder="Male, Female, Unknown" />
                            </UFormField>

                            <UFormField label="Weight (kg)" name="weightkg">
                                <template #label>
                                    <span class="text-base font-semibold text-gray-800">Weight (kg)</span>
                                </template>
                                <UInput type="number" v-model="animalCopy.weightkg" size="lg"
                                    class="[&_input]:text-gray-900 [&_input]:font-medium w-full" placeholder="0.0" />
                            </UFormField>

                            <UFormField label="Notes" name="notes">
                                <template #label>
                                    <span class="text-base font-semibold text-gray-800">Notes</span>
                                </template>
                                <UTextarea v-model="animalCopy.notes"
                                    class="[&_textarea]:text-gray-900 [&_textarea]:font-medium resize-none w-full"
                                    :rows="4" placeholder="Add any additional notes about the animal..." />
                            </UFormField>

                        </div>
                    </div>
                </UForm>

            </div>

        </div>
    </div>
</template>


<script setup lang="ts">
import { ref, watch, defineProps, defineEmits, type PropType } from 'vue'
import ImageFileInput from '@/components/inputs/ImageFileInput.vue'
import type { AnimalType } from '@/model/AnimalType'

// Props
const props = defineProps({
    animal: {
        type: Object as PropType<AnimalType>,
        required: true
    },
    isEdit: {
        type: Boolean,
        default: false
    }
})

// Emits
const emit = defineEmits(['update:open', 'submit'])

// Work on a copy until save
const animalCopy = ref(JSON.parse(JSON.stringify(props.animal)))

// Sync when parent changes
watch(
    () => props.animal,
    (val) => {
        animalCopy.value = JSON.parse(JSON.stringify(val))
    },
    { deep: true }
)

// Submit handler for UForm
function submitForm() {
    console.log("submit form", animalCopy.value);

    emit('submit', animalCopy.value)
}
</script>