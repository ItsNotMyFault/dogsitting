<template>
    <div>
        <div class="sectionTitle">
            {{ teamName }}
        </div>
        <SubMenu :componentList="componentListKeys" v-model="component" />
        <component :is="componentItem" :teamName="name" />
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import TeamCards from '@components/team/TeamCards.vue'
import ClientCalendar from '@components/calendar/ClientCalendar.vue'
import SubMenu from '@components/navigation/SubMenu.vue'
import teamServices from '@services/teamServices.js'

const props = defineProps({
    name: {
        type: String,
        required: true
    }
})

const component = ref('detail')
const team = ref(null)

const componentList = {
    'detail': TeamCards,
    'reserve': ClientCalendar
}

const componentListKeys = Object.keys(componentList)

const teamName = computed(() => team.value?.name || null)
const componentItem = computed(() => componentList[component.value])

onMounted(async () => {
    const response = await teamServices.getTeamByNormalizedName(props.name)
    team.value = response
})
</script>