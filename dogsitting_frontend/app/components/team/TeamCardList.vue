<template>
  <div class="min-h-screen p-6">
    <!-- Header Card -->
    <a href="#"
      class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 mb-8">
      <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        TEAM CARD LIST HERE acquisitions 2021
      </h5>
      <p class="font-normal text-gray-700 dark:text-gray-400">
        Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
      </p>
    </a>

    <!-- Add Button -->
    <ButtonsCardAddButton @click="navigate" class="mb-8" />

    <!-- Team Cards Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <TeamCard v-for="team in list" :key="team.id" :team="team" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TeamType } from '@/model/TeamType';
import { TeamRepositoryHttp } from '@/services/repositories/TeamRepositoryHttp';
import { $fetchClient } from "~/libs/http/adapters/NuxtAdapter";

const teamRepo = new TeamRepositoryHttp($fetchClient)

const list = ref<TeamType[]>([]);

teamRepo.getTeams().then((data: TeamType[]) => {
  console.log("data", data);
  list.value = data ?? []
}).catch(error => {
  console.error("error", error);
});

const router = useRouter()

const navigate = () => {
  router.push({ path: '/team/create' })
}
</script>