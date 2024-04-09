<template>

    <div class="sectionTitle">
        create team
    </div>

    <div class="form">
        <label>name</label>
        <input type="text" v-model="team.name">
        <label>phone</label>
        <input type="text" v-model="team.phone">
        <label>email</label>
        <input type="text" v-model="team.email">
        double => {{ double }} <br>
        <button type="submit" @click="submit">submit {{ count }}</button>
    </div>
</template>
<script>
import Team from '@/model/team'
import { mapStores, mapState, mapActions } from 'pinia'
import { useCounterStore } from '@/stores/counter'

export default {
    name: 'TeamForm',

    computed: {
        ...mapStores(useCounterStore),
        ...mapState(useCounterStore, ['count', 'double']),
    },

    data() {
        return {
            team: new Team(),
        }
    },

    methods: {
        ...mapActions(useCounterStore, ['increment']),

        async submit() {
            this.increment()
            //axios create team?
        }
    }
}
</script>@/stores/counter