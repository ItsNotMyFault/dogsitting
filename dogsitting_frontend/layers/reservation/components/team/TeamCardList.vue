<template>
    <div style="display: flex; flex-direction: row; flex-wrap: wrap;">
        <CardAddButton @click="navigate()" class="TeamCard-dimensions"></CardAddButton>
        <TeamCard :team="team" v-for="team in list" :key="team" />

    </div>
</template>
<script>
import TeamCard from '@/components/team/TeamCard.vue'
import ListInit from '@/model/mixins/ListInit.js'
import CardAddButton from '~/components/buttons/CardAddButton.vue'

export default {
    name: 'TeamCardList',

    mixins: [ListInit],

    components: {
        TeamCard,
        CardAddButton
    },

    methods: {
        navigate() {
            this.$router.push({ path: `/team/create` })
        }
    }
}
</script>