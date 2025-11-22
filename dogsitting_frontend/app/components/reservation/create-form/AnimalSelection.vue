<template>
	<div class="reservationForm-addanimals">
		<AnimalList v-model:selected="selectedAnimalIds" @update:selected="handleSelectedAnimals" :animals="animals">
		</AnimalList>
		<CardAddButton class="reservationForm-addanimals-button" @click="navigateCreateAnimal()"></CardAddButton>
	</div>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useReservationFormStore } from '@/stores/reservationFormStore'
import { useAuthStore } from '~/stores/authStore'
import { AnimalRepositoryHttp } from '@/services/repositories/AnimalRepositoryHttp';
import { $fetchClient } from "~/libs/http/adapters/NuxtAdapter";
import type { AnimalType } from '@/model/AnimalType'

const animlaRepo = new AnimalRepositoryHttp($fetchClient)

const router = useRouter()
const reservationFormStore = useReservationFormStore()
const { applicationUser } = useAuthStore()
console.log("applicationUser", applicationUser);


const { lodgerCount, step } = storeToRefs(reservationFormStore)
const animalOptions = ref([]);
const animals = ref<AnimalType[]>([]);
const selectedAnimalIds = ref<string[]>([]);
const emit = defineEmits(['submit'])

const handleSelectedAnimals = (selectedIds: string[]) => {
	reservationFormStore.setAnimals(selectedIds);
}

const navigateCreateAnimal = () => {
	router.push({ path: `/animal/create` })
}

onMounted(async () => {
	const userAnimals = await animlaRepo.getUserAnimals(applicationUser.id)
	console.log("response userAnimals", userAnimals);
	animals.value = userAnimals;
	animalOptions.value = userAnimals?.map(animal => animal.asOption)
});


</script>