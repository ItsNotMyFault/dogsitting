<template>
    <div>
        <div class="sectionTitle">
            <div>
                <span @click="showCalendar = false"> {{ teamName }}</span> - <span class="link"
                    @click="showCalendar = true"> calendar</span>
            </div>
        </div>
        <br>
        <TeamCards></TeamCards>
        <ClientCalendar v-if="showCalendar" :teamName="normalizedTeamName"></ClientCalendar>
    </div>
</template>
<script>
import TeamCards from '@components/team/TeamCards.vue'
import ActivityCard from '@components/ActivityCard.vue'
import ClientCalendar from '@components/calendar/ClientCalendar.vue'
import teamServices from '@services/teamServices.js'


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
        ActivityCard,
        ClientCalendar
    },

    computed: {
        teamName() {
            return this.team ? this.team.name : null
        },
        normalizedTeamName() {
            return this.team ? this.team.normalizedName : null
        }
    },

    data() {
        return {
            showCalendar: false,
            title: null,
            team: null,

        }
    },

    methods: {
        submitForm() {
            console.log('submit form');
        }
    },

    async created() {
        const response = await teamServices.getTeamByNormalizedName(this.name).then(response => {
            this.team = response
            this.showCalendar = true
        })
    }
}
</script>
