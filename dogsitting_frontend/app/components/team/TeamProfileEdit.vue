<template>
    <div class="teamProfileEdit">
        <div class="teamProfileEdit-form">
            team card preview below here
            <TeamCardPreview :image1="image1" :image2="image2" :image3="image3" :image4="image4" />

            <div class="form">
                <RouterLink to="/my-team">
                    go back
                </RouterLink>

                <label>
                    <span>name: </span>
                    <span>{{ team.name }}</span>
                    <input type="text" v-model="team.name" />
                </label>

                <!-- <label>
                    <input type="checkbox" v-model="team.useAvailabilities" />
                    UseAvailabilities
                </label>

                <label>
                    <input type="checkbox" v-model="team.useUnavailabilities" />
                    UseUnavailabilities
                </label>

                <label>
                    MaxWeekDaysLodgerCount
                    <input type="number" v-model="team.maxWeekDaysLodgerCount" min="1" max="10" step="1" />
                </label>

                <label>
                    MaxWeekendDaysLodgerCount
                    <input type="number" v-model="team.maxWeekendDaysLodgerCount" min="1" max="10" step="1" />
                </label> -->

                <button @click="save">Save</button>
                saving => {{ saving }}
            </div>
        </div>

        <label>Profile picture combination</label>

        <div>
            <ImageFileDisplay :file="image1?.fileData" />
            <ImageFileDisplay :file="image2?.fileData" />
            <ImageFileDisplay :file="image3?.fileData" />
            <ImageFileDisplay :file="image4?.fileData" />
            <button @click="saveImages">Save</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import Team from "@/model/team";
import { useAuthStore } from "~/stores/authStore";
import { TeamRepositoryHttp } from "@/services/repositories/TeamRepositoryHttp";
import { $fetchClient } from "~/libs/http/adapters/NuxtAdapter";
import ImageFileDisplay from "../inputs/ImageFileDisplay.vue";

const teamRepo = new TeamRepositoryHttp($fetchClient);

/* -------------------------------------------------------------------------- */
/*   STATE                                                                    */
/* -------------------------------------------------------------------------- */

const team = reactive(new Team(null));
const saving = ref(false);

const files = ref<any[]>([]); // backend returned team files

// images (File OR base64)
const image1 = ref<any>(null);
const image2 = ref<any>(null);
const image3 = ref<any>(null);
const image4 = ref<any>(null);

/* -------------------------------------------------------------------------- */
/*   HELPERS                                                                   */
/* -------------------------------------------------------------------------- */

function findFileByPosition(position: number) {
    const file = files.value.find((f) => f.position === position);
    console.log("file found", file);
    return file?.fileData ?? null;
}

/* -------------------------------------------------------------------------- */
/*   METHODS                                                                   */
/* -------------------------------------------------------------------------- */

function saveImages() {
    const pictures: any[] = [];

    if (image1.value instanceof File)
        pictures.push({ file: image1.value, position: 1 });

    if (image2.value instanceof File)
        pictures.push({ file: image2.value, position: 2 });

    if (image3.value instanceof File)
        pictures.push({ file: image3.value, position: 3 });

    if (image4.value instanceof File)
        pictures.push({ file: image4.value, position: 4 });

    console.log("pictures", pictures);

    saving.value = true;
    teamRepo.saveTeamFiles(team.id, pictures).finally(() => {
        saving.value = false;
    });
}

function save() {
    saving.value = true;
    teamRepo.update(team.id, team).finally(() => {
        saving.value = false;
    });
}

/* -------------------------------------------------------------------------- */
/*   LIFECYCLE                                                                 */
/* -------------------------------------------------------------------------- */

onMounted(async () => {
    const authStore = useAuthStore();

    const teamId = "08dd90bd-f37f-48d8-81c3-b68aaabcf4da";

    const teamData = await teamRepo.get(teamId);
    Object.assign(team, teamData);

    files.value = await teamRepo.getTeamFiles(teamId);

    console.log("files.value", files.value);

    console.log("files.value?.length", files.value?.length);

    if (files.value?.length > 0) {
        image1.value = findFileByPosition(1);
        image2.value = findFileByPosition(2);
        image3.value = findFileByPosition(3);
        image4.value = findFileByPosition(4);
    }
});
</script>

<style scoped></style>
