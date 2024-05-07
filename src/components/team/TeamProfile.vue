<template>
    <div>
        <div class="form">
            <label>
                <span>name: </span>
                <span>{{ team.name }}</span>
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
        console.log('get team from store', authStore.getTeam);
        this.team = await teamServices.findById(authStore.getTeam.id);
        console.log('this.team', this.team);
    }

}
</script>