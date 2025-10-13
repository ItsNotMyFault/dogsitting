<template>
    <div>
        <div class="sectionTitle">
            {{ teamName }}
        </div>
        <SubMenu :componentList="componentListKeys" v-model="component"></SubMenu>
        <component :is="componentItem" :teamName="name"></component>
    </div>
</template>
<script>
import TeamCards from '@components/team/TeamCards.vue'
import ClientCalendar from '@components/calendar/ClientCalendar.vue'
import SubMenu from '@components/navigation/SubMenu.vue'
import teamServices from '@services/teamServices.js'

const componentList = {
    'detail': TeamCards,
    'reserve': ClientCalendar,
}

export default {
    name: 'TeamDetail',

    props: {
        name: {
            type: String,
            required: true
        }
    },

    components: {
        TeamCards,
        SubMenu,
        ClientCalendar
    },

    computed: {
        teamName() {
            return this.team ? this.team.name : null
        },
        componentItem() {
            return componentList[this.component]
        }
    },

    data() {
        return {
            component: 'detail',
            componentListKeys: Object.keys(componentList),
            title: null,
            team: null,

        }
    },

    async created() {
        const response = await teamServices.getTeamByNormalizedName(this.name)
        this.team = response
        this.showCalendar = true
    }
}
</script>
