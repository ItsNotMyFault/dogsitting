<template>
    <div class="sectionTitle">
        Team Profile
    </div>
    <TeamProfile></TeamProfile>
</template>

<script>
import TeamProfile from '@components/team/TeamProfile.vue';

export default {
    name: 'MyTeamView',

    components: {
        TeamProfile
    },
}
</script>