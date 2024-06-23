<template>
    {{ modelValue }} <br>
    {{ selected }}
    <VueSelect v-model="selected" isMulti :options="options" placeholder="Select an option">
        <template #option="{ option }">
            {{ option }}
            <div class="animalSelect-option">
                <ImageFileDisplay v-if="option.data.media" :file="option.data.media.FileData"></ImageFileDisplay>
                <!-- {{ option?.label }} <br> -->
                {{ option.value }}
            </div>
        </template>
        <template #no-options>
            No options found.
        </template>
    </VueSelect>
</template>

<script>
import ImageFileDisplay from '@components/inputs/ImageFileDisplay.vue'
export default {
    name: 'AnimalSelect',

    components: {
        ImageFileDisplay
    },

    props: {
        //is an array of animal id
        modelValue: {
            type: Array,
            required: true
        },
        options: {
            type: Array,
            required: true
        }
    },

    watch: {
        selected(newVal) {
            this.$emit('update:modelValue', newVal)
        }
    },


    data() {
        const filteredAnimalOptions = this.options.filter(animalOption => this.modelValue.includes(animalOption.value))
        console.log('filteredAnimalOptions', filteredAnimalOptions);
        return {
            // selected: this.modelValue
            selected: this.modelValue
        }
    },
}

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