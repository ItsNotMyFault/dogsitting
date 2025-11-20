<template>
	<div class="reservationForm-addanimals">
		STEP: {{ step }} - Select Animals
		<AnimalSelect v-model="animals" :options="animalOptions" style="min-width: 600px;" :limit="lodgerCount">
		</AnimalSelect>
		<CardAddButton class="reservationForm-addanimals-button" @click="navigateCreateAnimal()"></CardAddButton>
	</div>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useReservationFormStore } from '@/stores/reservationFormStore'
import { useAuthStore } from '~/stores/authStore'
import AnimalSelect from '@/components/animal/AnimalSelect.vue'

const router = useRouter()
const reservationFormStore = useReservationFormStore()

const { animals, lodgerCount, step } = storeToRefs(reservationFormStore)
const animalOptions = ref([])
const emit = defineEmits(['submit'])

const navigateCreateAnimal = () => {
	router.push({ path: `/animal/create` })
}

watch(animals, (newValue) => {
	reservationFormStore.setAnimals(newValue)
}, { deep: true })

onMounted(async () => {
	const userAnimals = [];
	// const userAnimals = await userServices.getUserAnimals(user.value.id)
	animalOptions.value = userAnimals.map(animal => animal.asOption)
	animals.value = reservationFormStore.getAnimals();
})


</script>