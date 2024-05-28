<template>
    <div class="teamProfileEdit">
        <div class="teamProfileEdit-form">
            <TeamCardPreview :image1="image1" :image2="image2" :image3="image3" :image4="image4"></TeamCardPreview>
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

        <label>
            Profile picture combination
        </label>
        <div class="teamProfileEdit-pictureList">
            <ImageFileInput v-model="image1"></ImageFileInput>
            <ImageFileInput v-model="image2"></ImageFileInput>
            <ImageFileInput v-model="image3"></ImageFileInput>
            <ImageFileInput v-model="image4"></ImageFileInput>
        </div>
        <label>
            Profile picture combination - PREVIEW
        </label>
    </div>
</template>
<script>
import Team from '@model/team'
import { useAuthStore } from '@/stores/authStore'
import teamServices from '@services/teamServices'
import ImageFileInput from '@components/inputs/ImageFileInput.vue'
import TeamCardPreview from '@components/team/TeamCardPreview.vue'

export default {
    name: 'TeamProfileEdit',

    components: {
        ImageFileInput,
        TeamCardPreview
    },

    data() {
        return {
            team: new Team(),
            saving: false,
            files: [],
            image1: null,
            image2: null,
            image3: null,
            image4: null,
        }
    },

    methods: {
        update(test) {
            console.log('update test', test);
        },
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