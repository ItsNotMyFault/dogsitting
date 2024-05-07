<template>
    <div class="sectionTitle">
        Modification Profile
    </div>
    <UserProfileEdit></UserProfileEdit>
</template>
<script>
import UserProfileEdit from '@components/UserProfileEdit.vue';
export default {
    name: 'MyProfileEditView',

    components: {
        UserProfileEdit
    },


}
</script>