<template>
    <div class="sectionTitle">
        Profile
    </div>
    <UserProfile></UserProfile>
</template>
<script>
import UserProfile from '@components/UserProfile.vue';
export default {
    name: 'MyProfileView',

    components: {
        UserProfile
    },


}
</script>