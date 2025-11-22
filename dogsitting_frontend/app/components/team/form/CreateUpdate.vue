<template>
	<div>
		<div class="">
			create team
		</div>

		<div class="">
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores minima non, odio pariatur
			quisquam vero officiis repellat temporibus labore maxime obcaecati! Eaque, error consectetur
			repellat quam minima possimus eligendi fugit.
		</div>

		<div class="form">
			<label>name</label>
			<input type="text" v-model="team.name" />

			double => {{ double }} <br />

			<button type="submit" @click="submit">submit count {{ count }}</button>
			<button type="submit" @click="submitCreate">submit team</button>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { storeToRefs } from "pinia";
import Team from "@/model/team";
import { useCounterStore } from "@/stores/counter";

import { TeamRepositoryHttp } from "@/services/repositories/TeamRepositoryHttp";
import { $fetchClient } from "~/libs/http/adapters/NuxtAdapter";

const teamRepo = new TeamRepositoryHttp($fetchClient);

/* ---------------------------------- STATE ---------------------------------- */

const team = ref(new Team());

/* --------------------------- PINIA: COUNTER STORE -------------------------- */

const counterStore = useCounterStore();
const { count, double } = storeToRefs(counterStore);

/* --------------------------------- METHODS -------------------------------- */

function submit() {
	counterStore.increment();
}

async function submitCreate() {
	await teamRepo.create(team.value);
}
</script>
