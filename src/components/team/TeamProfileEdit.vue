<template>
    <div>
        <div class="form">
            <RouterLink to="/my-team"> <button>go back <= </button>
            </RouterLink>
            <label>
                <span>name: </span>
                <span>{{ team.name }}</span>
                <input type="text" v-model="team.name">
            </label>
            <label>
                <input type="checkbox" v-model="team.useAvailabilities"> UseAvailabilities
            </label>
            <label>
                <input type="checkbox" v-model="team.useUnavailabilities"> UseUnavailabilities
            </label>
            <label>
                MaxWeekDaysLodgerCount
                <input type="number" v-model="team.maxWeekDaysLodgerCount" min="1" max="10" step="1">
            </label>
            <label>
                MaxWeekendDaysLodgerCount
                <input type="number" v-model="team.maxWeekendDaysLodgerCount" min="1" max="10" step="1">
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
            teamServices.update(this.team.id, this.team).then(response => {
                this.saving = false
            });
        },

    },

    async created() {

        const authStore = useAuthStore();
        this.team = await teamServices.findById(authStore.getTeam.id);
    }

}
</script>