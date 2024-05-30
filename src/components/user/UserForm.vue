<template>
    <div class="bloc">
        <div class="form">
            <label>firstName</label>
            <input type="text" v-model="user.firstName">
            <label>lastName</label>
            <input type="text" v-model="user.lastName">
            <label>phone</label>
            <input type="text" v-model="user.phonenumber">
            <label>email</label>
            <input type="text" v-model="user.email">
            <button @click="save">Save</button>
            saving => {{ saving }}
        </div>
    </div>
</template>
<script>
import User from '@model/user'
import userServices from '@services/userServices'

export default {
    name: 'UserForm',

    props: {
        user: {
            type: User,
            required: true
        }
    },

    data() {
        return {
            saving: false
        }
    },

    methods: {
        async save() {
            this.saving = true
            userServices.update(this.user.id, this.user).then(response => {
                this.saving = false
            });
        }
    },



}
</script>
