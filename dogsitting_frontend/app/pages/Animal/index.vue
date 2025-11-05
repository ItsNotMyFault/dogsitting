<template>
    <div class="section">
        <AnimalList v-if="animals?.length" :animals="animals"></AnimalList>
    </div>
</template>
<script setup lang="ts">
definePageMeta({
    layout: "dashboard"
});
import AnimalList from '~/components/animal/AnimalList.vue';
import animalServices from '~/services/animalServices'

const animals = ref();
animals.value = await animalServices.getAnimals();
console.log("animals.value", animals.value);

// await animalServices.getAnimals().then(response => {
//     console.log("response.data", response?.data);

//     animals.value = response?.data;
// });

</script>