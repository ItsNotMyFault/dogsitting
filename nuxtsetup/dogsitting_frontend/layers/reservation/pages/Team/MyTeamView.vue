<template>
    <div class="sectionTitle">
        Team Profile
    </div>
    <TeamProfile></TeamProfile>
    <AvailabilitiesCalendar :teamName=teamName></AvailabilitiesCalendar>
</template>

<script>
import { useAuthStore } from '@/stores/authStore'
import TeamProfile from '@components/team/TeamProfile.vue';
import AvailabilitiesCalendar from '@components/calendar/AvailabilitiesCalendar.vue';

export default {
    name: 'MyTeamView',

    components: {
        TeamProfile,
        AvailabilitiesCalendar
    },

    data() {
        return {
            authStore: null
        }
    },

    computed: {
        teamName() {
            return this.authStore.getTeamName
        }
    },

    created() {
        this.authStore = useAuthStore();
    }
}
</script>