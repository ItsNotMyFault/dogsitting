<template>
    <div class="section">
        <AnimalList v-if="animals?.length" :animals="animals"></AnimalList>
    </div>
</template>
<script setup lang="ts">
definePageMeta({
    layout: "dashboard"
});

import { AnimalRepositoryHttp } from '@/services/repositories/AnimalRepositoryHttp';
import { $fetchClient } from "~/libs/http/adapters/NuxtAdapter";

const animalRepo = new AnimalRepositoryHttp($fetchClient)


const animals = ref([]);
const init = async () => {
    animalRepo.getAnimals
    animals.value = await animalRepo.getAnimals();
    console.log("animals.value", animals.value);

}

init();

</script>