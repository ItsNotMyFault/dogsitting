<template>
    <div class="sectionTitle">
        Modification Profile
    </div>
    <TeamProfileEdit></TeamProfileEdit>
</template>

<script>
import TeamProfileEdit from '@components/team/TeamProfileEdit.vue';

export default {
    name: 'MyTeamEditView',

    components: {
        TeamProfileEdit
    },


}
</script>