<template>
    <div>
        <div class="sectionTitle">
            {{ teamName }}
        </div>
        <UTabs :items="items">
            <template #detail>
                detail
            </template>
            <template #calendar>
                asdfadsf
                <CalendarClientCalendar></CalendarClientCalendar>
            </template>
        </UTabs>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

import { TeamRepositoryHttp } from '@/services/repositories/TeamRepositoryHttp';
import { $fetchClient } from "~/libs/http/adapters/NuxtAdapter";

definePageMeta({
    layout: "dashboard"
});

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


const teamName = computed(() => team.value?.name || null)

onMounted(async () => {
    const response = await teamRepo.getTeamByNormalizedName(props.name)
    team.value = response
})
</script>