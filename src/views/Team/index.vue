<template>
    <div style="width: 100%;">
        <div class="sectionTitle">Teams</div>
        <TeamCardList :teamList="list"></TeamCardList>
    </div>
</template>
<script>

import ListInit from '@/model/mixins/ListInit.js'
import TeamCard from '@/components/TeamCard.vue'
import TeamCardList from '@/components/TeamCardList.vue'
export default {
    name: 'TeamIndex',

    components: {
        TeamCard,
        TeamCardList
    },

    mixins: [ListInit],
}
</script>
