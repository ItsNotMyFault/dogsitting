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
        options: {
            immediate: true,
            handler(newVal) {
                this.updateSelectedFromModelValue(this.modelValue)
                this.updateAvailableOptions(this.modelValue)
            }
        },
        modelValue: {
            immediate: true,
            handler(newVal) {
                this.updateAvailableOptions(this.modelValue)
            }
        }
    },


    data() {
        return {
            selected: [],
            filteredOptions: []
        }
    },

    methods: {
        updateSelectedFromModelValue(modelValue) {
            if (this.options.length > 0) {
                this.selected = this.options.filter(option => modelValue.includes(option.value))
            }

        },
        updateAvailableOptions() {
            if (this.options.length > 0) {
                this.filteredOptions = this.options.filter(option => !this.modelValue.includes(option.value))
            }
            console.log('this.options', this.options);
            console.log('this.modelValue', this.modelValue);
            console.log('this.filteredOptions', this.filteredOptions);
        },
        optionSelected(selectedOptions) {
            //same as this.selected
            this.$emit('update:modelValue', selectedOptions.map(option => option.value))
        },
        optionDeselected() {
            this.$emit('update:modelValue', this.selected.map(opt => opt.value))
        },
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