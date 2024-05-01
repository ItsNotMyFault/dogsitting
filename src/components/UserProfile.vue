<template>
    <div>
        <div class="form">
            <label>
                <span>firstname: </span>
                <span>{{ user.firstName }}</span>
            </label>

            <label>
                <span>lastName: </span>
                <span>{{ user.lastName }}</span>
            </label>

            <label>
                <span>phone: </span>
                <span>{{ user.phonenumber }}</span>
            </label>

            <label>
                <span>email: </span>
                <span>{{ user.email }}</span>
            </label>

            <div>My TEAMS</div>
            <div v-for="team in teams" :key="team.id" class="teamtest">
                <span @click="setActive(team)">{{ team.normalizedName }}</span>
            </div>
        </div>
    </div>
</template>
<script>
import User from '@model/user'
import userService from '@services/userServices'
import teamServices from '@services/teamServices'
import { useAuthStore } from '@/stores/authStore'
export default {
    name: 'UserProfile',

    data() {
        return {
            user: new User(),
            teams: [],
        }
    },

    computed: {
        teamNames() {
            return this.teams.map(team => team.normalizedName)
        }
    },

    methods: {
        setActive(team) {
            const authStore = useAuthStore();
            authStore.setActiveTeam(team)
        }
    },

    async created() {
        const authStore = useAuthStore();
        console.log(authStore.applicationUser);
        this.user = await userService.findById(authStore.applicationUser.id);

        this.teams = await teamServices.getUserTeams(authStore.applicationUser.id)
    }

}
</script>