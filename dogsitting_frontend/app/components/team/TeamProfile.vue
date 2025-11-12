<template>
    <div class="bloc">
        <div class="form">
            TEAM PROFILE
            <label>
                <span>name: </span>
                <span>{{ team?.name }}</span>
            </label>
            <label>
                Calendar details here
                <!-- UseAvailabilities: {{ team.useAvailabilities }} <br>
                UseUnavailabilities: {{ team.useUnavailabilities }} <br>
                MaxWeekDaysLodgerCount: {{ team.maxWeekDaysLodgerCount }} <br>
                MaxWeekendDaysLodgerCount: {{ team.maxWeekendDaysLodgerCount }} -->
            </label>
        </div>
    </div>
</template>

<script setup lang="ts">
import { type TeamType } from '@/model/TeamType';
import { TeamRepositoryHttp } from '@/services/repositories/TeamRepositoryHttp';
import { $fetchClient } from "~/libs/http/adapters/NuxtAdapter";

const teamRepo = new TeamRepositoryHttp($fetchClient)

const props = defineProps({
    teamId: {
        type: String,
        required: true
    }
})

const team = ref<TeamType>();

const init = async () => {
    if (props?.teamId) {
        team.value = await teamRepo.get(props.teamId);
    }
}

init();
</script>