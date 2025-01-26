<template>
    <div class="bloc">
        <div class="form">

            <label>
                <span>name: </span>
                <span>{{ team.name }}</span>
            </label>
            <label>
                UseAvailabilities: {{ team.useAvailabilities }} <br>
                UseUnavailabilities: {{ team.useUnavailabilities }} <br>
                MaxWeekDaysLodgerCount: {{ team.maxWeekDaysLodgerCount }} <br>
                MaxWeekendDaysLodgerCount: {{ team.maxWeekendDaysLodgerCount }}
            </label>
            <RouterLink to="/my-team/edit"> <button>edit</button></RouterLink>
        </div>
    </div>
</template>
<script>
import Team from '@model/team'
import { useAuthStore } from '@/stores/authStore'
import teamServices from '@services/teamServices'

export default {
    name: 'TeamProfile',

    data() {
        return {
            team: new Team(),
        }
    },

    async created() {
        const authStore = useAuthStore();
        this.team = await teamServices.findById(authStore.getTeam.id);
    }

}
</script>