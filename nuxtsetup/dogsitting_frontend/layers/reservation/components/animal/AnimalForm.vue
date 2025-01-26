<template>
    <div class="bloc">
        <div class="form" style="flex-direction: row;">
            <div>
                <ImageFileInput v-if="!isEdit" v-model="animal.media"></ImageFileInput>
                <ImageFileInput v-else v-model="animal.media.FileData"></ImageFileInput>
                <!-- TODO: find some way to fix this. -->
            </div>
            <div class="form">
                <label>name</label>
                <input type="text" v-model="animal.name">
                <label>birthdate</label>
                <VueDatePicker v-model="animal.birthdate" format="yyyy-MM-dd" auto-apply />
                <label>species</label>
                <input type="text" v-model="animal.species">
                <label>breed</label>
                <input type="text" v-model="animal.breed">
                <label>gender</label>
                <input type="text" v-model="animal.gender">
                <label>Weight</label>
                <input type="number" v-model="animal.weightkg">
                <label>notes</label>
                <input type="textarea" v-model="animal.notes">
            </div>
        </div>
        <button @click="save">Save</button>
    </div>
</template>
<script>
import Animal from '@model/animal'
import ImageFileInput from '@components/inputs/ImageFileInput.vue'
export default {
    name: 'AnimalForm',

    props: {
        animal: {
            type: Animal,
            required: true
        },
        isEdit: Boolean
    },

    components: {
        ImageFileInput
    },

    methods: {
        async save() {
            this.$emit('submit', this.animal)
        }
    },
}
</script>
