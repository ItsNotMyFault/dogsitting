<template>
    <div>
        <div class="form">
            <label>
                <span>name: </span>
                <span>{{ team.name }}</span>
                <input type="text" v-model="team.name">
            </label>
            <button @click="save">Save</button>
            saving => {{ saving }}
        </div>
    </div>
</template>
<script>
import Team from '@model/team'
import { useAuthStore } from '@/stores/authStore'
import teamServices from '@services/teamServices'

export default {
    name: 'TeamProfileEdit',

    data() {
        return {
            team: new Team(),
            saving: false
        }
    },

    methods: {
        async save() {
            this.saving = true
            console.log('this.team', this.team);
            teamServices.update(this.team.id, this.team).then(response => {
                this.saving = false
            });
        }
    },

    async created() {

        const authStore = useAuthStore();
        console.log('get team from store', authStore.getTeam);
        this.team = await teamServices.findById(authStore.getTeam.id);

        // this.user = await userService.findById(authStore.applicationUser.id);
        // console.log('this.user', this.user);

        // this.teams = await teamServices.getUserTeams(authStore.applicationUser.id)
    }

}
</script>