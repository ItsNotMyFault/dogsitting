<template>
    <div style="display: flex; flex-direction: row; flex-wrap: wrap;">
        <TeamCard :team="team" v-for="team in list" :key="team" />
        <TeamCardNewButton></TeamCardNewButton>
    </div>
</template>
<script>
import TeamCard from '@/components/team/TeamCard.vue'
import ListInit from '@/model/mixins/ListInit.js'
import TeamCardNewButton from '@/components/buttons/TeamCardNewButton.vue'

export default {
    name: 'TeamCardList',

    mixins: [ListInit],

    components: {
        TeamCard,
        TeamCardNewButton
    },
}
</script>