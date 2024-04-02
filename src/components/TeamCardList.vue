<template>
    <div style="display: flex; flex-direction: row; flex-wrap: wrap;">
        <TeamCard :team="team" v-for="team in teamList" :key="team" />
    </div>
</template>
<script>
import TeamCard from '@/components/TeamCard.vue'

export default {
    name: 'TeamCardList',

    components: {
        TeamCard
    },

    props: {
        teamList: {
            type: Array,
            required: true
        }
    }
}
</script>