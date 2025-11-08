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
            <button @click="saveImages()">Save</button>
        </div>
    </div>
</template>
<script>
import Team from '@/model/team.ts'
import { useAuthStore } from '~/stores/authStore'
import teamServices from '@services/teamServices'
import ImageFileInput from '@components/inputs/ImageFileInput.vue'
import TeamCardPreview from '@components/team/TeamCardPreview.vue'
import { TeamRepositoryHttp } from '@/services/repositories/TeamRepositoryHttp';
import { $fetchClient } from "~/libs/http/adapters/NuxtAdapter";

const teamRepo = new TeamRepositoryHttp($fetchClient)


export default {
    name: 'TeamProfileEdit',

    components: {
        ImageFileInput,
        TeamCardPreview,
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
        saveImages() {
            const pictures = []
            if (this.image1 instanceof File) {
                pictures.push({ file: this.image1, position: 1 })
            }
            if (this.image2 instanceof File) {
                pictures.push({ file: this.image2, position: 2 })
            }
            if (this.image3 instanceof File) {
                pictures.push({ file: this.image3, position: 3 })
            }
            if (this.image4 instanceof File) {
                pictures.push({ file: this.image4, position: 4 })
            }
            console.log('pictures', pictures);
            teamRepo.saveTeamFiles(this.team.id, pictures).then(response => {
                this.saving = false
            });
        },
        async save() {
            this.saving = true
            teamRepo.update(this.team.id, this.team).then(response => {
                this.saving = false
            });
        },
        findFileByPosition(position) {
            const file = this.files.find(file => file.Position === position)
            return file?.FileData || null
        }

    },

    async created() {

        const authStore = useAuthStore();
        this.team = await teamRepo.findById(authStore.getTeam.id);
        this.files = await teamRepo.getTeamFiles(authStore.getTeam.id);
        if (this.files?.length) {
            this.image1 = this.findFileByPosition(1)
            this.image2 = this.findFileByPosition(2)
            this.image3 = this.findFileByPosition(3)
            this.image4 = this.findFileByPosition(4)
        }

    }

}
</script>