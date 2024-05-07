<template>
    <div>
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
import authServices from '@services/authServices'
import userServices from '@services/userServices'
export default {
    name: 'UserProfileEdit',

    data() {
        return {
            user: new User(),
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


    async created() {
        this.user = await authServices.GetCurrentUser();
    }

}
</script>
