<template>
    <div>
        <div class="sectionTitle">
            Profile
        </div>
        <div class="bloc">
            <UserDetail :user="user">
                <template #teams>
                    <div>My TEAMS</div>
                    <div v-for="team in teams" :key="team.id" class="teamtest">
                        <span @click="setActive(team)">{{ team.normalizedName }}</span>
                    </div>
                </template>
            </UserDetail>
            <RouterLink to="/my-profile/edit"> edit</RouterLink>
        </div>
        <UserAnimals v-if="userId" :userId="userId"></UserAnimals>
        <RouterLink to="/animals/create"> add animal</RouterLink>
    </div>

</template>
<script>
import User from '@model/user'
import userService from '@services/userServices'
import teamServices from '@services/teamServices'
import UserDetail from '@components/user/UserDetail.vue'
import UserAnimals from '@components/user/UserAnimals.vue'
import { useAuthStore } from '@/stores/authStore'
export default {
    name: 'MyProfileView',

    components: {
        UserDetail,
        UserAnimals
    },

    data() {
        return {
            user: new User(),
            teams: [],
        }
    },

    computed: {
        teamNames() {
            return this.teams.map(team => team.normalizedName)
        },
        userId() {
            return this.user?.id || null
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
        this.user = await userService.findById(authStore.applicationUser.id);
        this.teams = await teamServices.getUserTeams(authStore.applicationUser.id)
    }

}
</script>