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
		<div class="mx-auto w-full mb-4">
			<div class="max-w-[700px] text-center mx-auto">
				La sélection de vos animaux permet un meilleur suivi de leur pension et de leurs besoins spécifiques.
				Si vous n'avez pas encore ajouté vos animaux, vous pouvez le faire maintenant : cliquer sur la carte "+".
			</div>
		</div>
		<div class="space-y-4 max-w-[500px] text-center mx-auto">
			<UButton @click="reservationFormStore.step = 3"
				class="w-full py-4 text-lg font-semibold rounded-xl justify-center bg-gradient-to-r from-purple-500 to-pink-500 hover:scale-[1.02] shadow-md hover:shadow-lg transition-all">
				Consulter la réservation ✨
			</UButton>

			<UButton variant="soft" class="w-full py-3 rounded-xl" icon="i-lucide-arrow-left"
				@click="reservationFormStore.step = 1">
				Retour
			</UButton>
		</div>

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


const { lodgerCount, step, selectedAnimals } = storeToRefs(reservationFormStore)
const animals = ref<AnimalType[]>([]);
const selectedAnimalIds = ref<string[]>([]);
const emit = defineEmits(['submit'])

const selectionLeft = computed(() => {
	return lodgerCount.value - selectedAnimalIds.value.length;
});

const goBack = () => {
	reservationFormStore.step = 1;
};

const handleSelectedAnimals = (selectedIds: string[]) => {

	reservationFormStore.setAnimals(animals.value.filter(animal => selectedIds.includes(animal.id)));
}

watch(() => selectedAnimals.value, () => {
	console.log("WATCHER SELECTED ANIMALS");

	selectedAnimalIds.value = selectedAnimals.value.map(animal => animal.id);
}, { immediate: true })

const navigateCreateAnimal = () => {
	router.push({ path: `/animal/create` })
}

onMounted(async () => {
	const userAnimals = await animlaRepo.getUserAnimals(applicationUser.id)
	console.log("response userAnimals", userAnimals);
	animals.value = userAnimals;
});


</script>