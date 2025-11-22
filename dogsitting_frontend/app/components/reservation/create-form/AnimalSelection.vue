<template>
	<div class="reservationForm-addanimals">
		<div class="p-6 max-w-5xl mx-auto text-black">
			<h1 class="text-3xl font-bold text-center text-green-400 mb-6">Mes Animaux</h1>
			<div class="text-center w-full mb-4">Sélectionnez les animaux
				<UIcon name="i-lucide-paw-print"
					class="w-5 h-5 inline-block ml-1 text-purple-400 fill-purple-400 animate-bounce" /> à mettre en pension pour
				cette réservation :
			</div>
			<div class="text-center w-full mb-4">Vous avez {{ selectionLeft }} choix d'animal restant

				<UTooltip :delay-duration="0" placement="top" :text="''">
					<template #content>
						<span>
							Le nombre d'animaux que vous pouvez sélectionner dépend du nombre de pensionnaires que vous avez indiqué
							dans l'étape précédente.
						</span>
					</template>
					<UIcon name="i-lucide-circle-question-mark"
						class="w-5 h-5 inline-block ml-1 text-purple-400 fill-purple-400" />
				</UTooltip>
			</div>
			<AnimalList v-model:selected="selectedAnimalIds" @update:selected="handleSelectedAnimals" :animals="animals">
			</AnimalList>
		</div>
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

const selectionLeft = computed(() => {
	return lodgerCount.value - selectedAnimalIds.value.length;
});

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