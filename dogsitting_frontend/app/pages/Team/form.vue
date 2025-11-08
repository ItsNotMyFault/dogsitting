<template>

    <div class="sectionTitle">
        create team
    </div>

    <div class="sectionDescription">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores minima non, odio pariatur quisquam vero
        officiis repellat temporibus labore maxime obcaecati! Eaque, error consectetur repellat quam minima possimus
        eligendi fugit.
    </div>

    <div class="form">
        <label>name</label>
        <input type="text" v-model="team.name">
        double => {{ double }} <br>
        <button type="submit" @click="submit">submit count {{ count }}</button>
        <button type="submit" @click="submitCreate">submit team</button>
    </div>
</template>
<script>
import Team from '@/model/team'
import { mapStores, mapState, mapActions } from 'pinia'
import { useCounterStore } from '@/stores/counter'

import { TeamRepositoryHttp } from '@/services/repositories/TeamRepositoryHttp';
import { $fetchClient } from "~/libs/http/adapters/NuxtAdapter";

const teamRepo = new TeamRepositoryHttp($fetchClient)

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
        },

        async submitCreate() {
            teamRepo.create(this.team)
            //axios create team?
        }
    }
}
</script>