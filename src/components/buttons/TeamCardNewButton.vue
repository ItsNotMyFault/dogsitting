<template>
    <div class="TeamCard" @click="navigate()">
        <div class="TeamCard-title" style="font-size: 5rem;">+</div>
    </div>
</template>
<script>
import Team from '@/model/team'
export default {
    name: 'TeamCardNewButton',

    props: {
        team: {
            type: Team,
            required: true
        }
    },

    computed: {
        teamName() {
            return this.team?.name || 'undefined'
        }

    },

    methods: {
        navigate() {
            this.$router.push({ path: `/teams/create` })
        }
    }

}
</script>