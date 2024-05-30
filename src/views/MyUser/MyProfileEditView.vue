<template>
    <div class="sectionTitle">
        Modification Profile
    </div>
    <UserForm :user="user"></UserForm>
</template>
<script>
import UserForm from '@components/user/UserForm.vue';
import authServices from '@services/authServices'
import User from '@model/user'
export default {
    name: 'MyProfileEditView',

    components: {
        UserForm,
    },

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