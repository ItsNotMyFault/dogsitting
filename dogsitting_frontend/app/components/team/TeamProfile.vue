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
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Team from '@/model/team.ts'
import { TeamRepositoryHttp } from '@/services/repositories/TeamRepositoryHttp';
import { $fetchClient } from "~/libs/http/adapters/NuxtAdapter";

const teamRepo = new TeamRepositoryHttp($fetchClient)

const team = ref(new Team())
const authStore = useAuthService()

onMounted(async () => {
    team.value = await teamRepo.findById(authStore.getTeam.id);
});
</script>