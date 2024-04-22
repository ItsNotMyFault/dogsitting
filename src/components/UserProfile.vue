<template>
    <div>
        <div class="form">
            <label>
                <span>firstname:</span>
                <span>{{ user.firstName }}</span>
            </label>
            <label>lastName</label>
            <input type="text" v-model="user.lastName">
            <label>phone</label>
            <input type="text" v-model="user.phonenumber">
            <label>email</label>
            <input type="text" v-model="user.email">
        </div>
    </div>
</template>
<script>
import User from '@model/user'
import authServices from '@services/authServices'
export default {
    name: 'UserProfile',

    data() {
        return {
            user: new User()
        }
    },

    async created() {
        this.user = await authServices.GetCurrentUser();
    }

}
</script>