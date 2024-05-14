<template>
    <div class="reserve">
        <h1>This is a calendar page</h1>
        <AdminCalendar :teamName="teamName"></AdminCalendar>
    </div>
</template>

<script>
import AdminCalendar from '@components/calendar/AdminCalendar.vue'
import { useAuthStore } from '@/stores/authStore'

export default {
    name: 'TeamCalendarAdminView',

    components: { AdminCalendar },

    data() {
        return {
            teamName: null
        }
    },

    async created() {
        const authStore = useAuthStore();
        this.teamName = authStore.getTeamNormalizedName
    }
}

</script>