<template>
	<div class="reservationForm-addanimals">
		<AnimalAnimalSelect v-model="animals" :options="animalOptions" style="min-width: 600px;" :limit="lodgerCount">
		</AnimalAnimalSelect>
		<CardAddButton class="reservationForm-addanimals-button" @click="navigateCreateAnimal()"></CardAddButton>
	</div>
</template>
<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useReservationFormStore } from '@/stores/reservationFormStore'
import { useAuthStore } from '~/stores/authStore'
import userServices from '@services/userServices'

const router = useRouter()
const reservationFormStore = useReservationFormStore()
const authStore = useAuthStore()

const { dateFrom, dateTo, notes, animals, lodgerCount } = storeToRefs(reservationFormStore)
const checked = ref(false)
const animalOptions = ref([])
const user = computed(() => authStore.applicationUser)
const emit = defineEmits(['submit'])

const navigateCreateAnimal = () => {
	router.push({ path: `/animal/create` })
}

watch(animals, (newValue) => {
	reservationFormStore.setAnimals(newValue)
}, { deep: true })

onMounted(async () => {
	const userAnimals = await userServices.getUserAnimals(user.value.id)
	animalOptions.value = userAnimals.map(animal => animal.asOption)
	animals.value = reservationFormStore.getAnimals();
})


</script>