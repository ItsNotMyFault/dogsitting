<template>
    <div class="sectionTitle">
        Profile
    </div>
    <UserProfile></UserProfile>
    <!-- button-nav to show user's reservations or to show user's team's reservations  -->
    <ReservationList></ReservationList>
</template>
<script>
import ReservationList from '@components/ReservationList.vue';
import UserProfile from '@components/UserProfile.vue';
export default {
    name: 'MyProfileView',

    components: {
        ReservationList,
        UserProfile
    },


}
</script>