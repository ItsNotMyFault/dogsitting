<template>
	<ReservationList :reservations="reservations" v-if="reservations?.length > 0">
		<template #title>
			My Reservations
		</template>
	</ReservationList>
	<h1 v-else>
		No reservations
	</h1>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import reservationServices from '@/services/reservationServices'
import { useAuthStore } from '~/stores/authStore'



definePageMeta({
	layout: "dashboard"
});


// Reactive references
const reservations = ref([])
const authStore = useAuthStore()

// Method to fetch reservations
const fetchReservations = async () => {
	try {
		reservations.value = await reservationServices.getReservationsByUserId(authStore.getUserId)
		console.log("reservations.value", reservations.value);
	} catch (error) {
		console.error('Failed to fetch reservations:', error)
	}
}

// Lifecycle: Fetch on component mount
onMounted(() => {
	fetchReservations()
})
</script>