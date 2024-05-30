<template>
    <div class="bloc">
        <div class="form">
            <label>name</label>
            <input type="text" v-model="animal.name">
            <label>birthdate</label>
            <input type="text" v-model="animal.birthdate">
            <label>species</label>
            <input type="text" v-model="animal.species">
            <label>breed</label>
            <input type="text" v-model="animal.breed">
            <label>gender</label>
            <input type="text" v-model="animal.gender">
            <label>notes</label>
            <input type="text" v-model="animal.notes">
            <button @click="save">Save</button>
        </div>
    </div>
</template>
<script>
import Animal from '@model/animal'
import authServices from '@services/authServices'
export default {
    name: 'AnimalForm',

    props: {
        animal: {
            type: Animal,
            required: true
        }
    },

    methods: {
        async save() {
            this.$emit('submit', this.animal)
        }
    },
}
</script>
