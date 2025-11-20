<template>
    <UCard class="m-4 h-full">
        <UTabs :items="items">
            <template #detail>
                <TeamProfile v-if="team?.id" :teamId="team?.id" />
            </template>
            <template #calendar>
                <!-- <ReservationCreateFormCalendarForm :teamName="name"></ReservationCreateFormCalendarForm> -->
                <ReservationCreateForm :teamName="name" />

            </template>
        </UTabs>
    </UCard>
</template>

<script setup lang="ts">
import { TeamRepositoryHttp } from '@/services/repositories/TeamRepositoryHttp';
import { $fetchClient } from "~/libs/http/adapters/NuxtAdapter";

const teamRepo = new TeamRepositoryHttp($fetchClient)

const props = defineProps({
    name: {
        type: String,
        required: true
    }
})

const team = ref(null)
const items = [
    {
        label: 'Details',
        icon: 'i-lucide-user',
        slot: 'detail'
    },
    {
        label: 'Réserver',
        icon: 'i-lucide-lock',
        slot: 'calendar'
    }
]


const init = async () => {

    const response = await teamRepo.getTeamByNormalizedName(props.name)
    console.log("team response", response);

    team.value = response
}
init();
</script>