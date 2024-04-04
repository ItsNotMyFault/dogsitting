<template>
    <div class="section">
        <div class="sectionTitle">Teams</div>
        <TeamCardList :model="model"></TeamCardList>
    </div>
</template>
<script>
import TeamCardList from '@/components/TeamCardList.vue'
import Team from '@/model/team'

export default {
    name: 'TeamIndex',

    components: {
        TeamCardList
    },

    data() {
        return {
            model: Team
        }
    },
}
</script>
