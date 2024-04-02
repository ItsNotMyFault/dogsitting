<template>
    <div class="TeamCard" @click="navigate()">
        <div class="TeamCard-title">{{ team.name }}</div>
        <div class="TeamCard-image">
            <img alt="img" src="@/assets/images/20230814_183252.jpg" />
        </div>
        <div class="TeamCard-image">
            <img alt="img" src="@/assets/images/20230817_191711.jpg" />
        </div>
        <div class="TeamCard-image">
            <img alt="img" src="@/assets/images/20231021_104551.jpg" />
        </div>
        <div class="TeamCard-image">
            <img alt="img" src="@/assets/images/20231021_112758.jpg" />
        </div>
    </div>
</template>
<script>
import Team from '@/model/team'
export default {
    props: {
        team: {
            type: Team,
            required: true
        }
    },

    computed: {
        teamName() {
            return this.team.name || 'undefined'
        }

    },

    methods: {
        navigate() {
            this.$router.push({ path: `/teams/${this.team.name}` })
        }
    }
}
</script>