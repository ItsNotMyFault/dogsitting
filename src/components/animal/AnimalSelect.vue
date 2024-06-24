<template>
    <div v-if="options && options.length">
        <VSelect v-model="selected" multiple :options="filteredOptions" placeholder="Select an option"
            @option:selected="optionSelected" @option:deselected="optionDeselected">
            <template #selected-option="option">
                {{ option?.label }} - TEST
                <!-- TODO add image display here in mini -->
            </template>
            <template #option="option">
                <div class="animalSelect-option">
                    <ImageFileDisplay v-if="option.data.media" :file="option.data.media.FileData"></ImageFileDisplay>
                    {{ option?.label }}
                </div>
            </template>
            <template #no-options>
                No options found.
            </template>
        </VSelect>
    </div>
    <div v-else>

        <h1 style="color: yellow; font-size: large;">Loading options...</h1>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import ImageFileDisplay from '@components/inputs/ImageFileDisplay.vue'

const props = defineProps({
    modelValue: {
        type: Array,
        required: true
    },
    options: {
        type: Array,
        required: true
    }
})

const emit = defineEmits(['update:modelValue'])

const selected = ref([])
const filteredOptions = ref([])

const updateSelectedFromModelValue = (modelValue) => {
    if (props.options.length > 0) {
        selected.value = props.options.filter(option => modelValue.includes(option.value))
    }
}

const updateAvailableOptions = () => {
    if (props.options.length > 0) {
        filteredOptions.value = props.options.filter(option => !props.modelValue.includes(option.value))
    }
}

const optionSelected = (selectedOptions) => {
    emit('update:modelValue', selectedOptions.map(option => option.value))
}

const optionDeselected = () => {
    emit('update:modelValue', selected.value.map(opt => opt.value))
}

watch(() => props.options, (newVal) => {
    updateSelectedFromModelValue(props.modelValue)
    updateAvailableOptions(props.modelValue)
}, { immediate: true })

watch(() => props.modelValue, (newVal) => {
    updateAvailableOptions(props.modelValue)
}, { immediate: true })

</script>



<style scoped>
.animalSelect-option {
    display: flex;
    align-items: center;
}

.animalSelect-option img {
    width: 230px;
    height: auto;
    /* Maintain aspect ratio */
    object-fit: cover;
    /* Ensures the image covers the set dimensions without distortion */
    margin-right: 10px;
    /* Space between image and text */
}
</style>