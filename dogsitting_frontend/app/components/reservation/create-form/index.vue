<template>
	<div>
		<div v-if="step === 1">
			<ReservationCreateFormCalendarForm :teamName="teamName" />
		</div>
		<div v-if="step === 2">
			<ReservationCreateFormAnimalSelection />
		</div>
		<div v-if="step === 3">
			<ReservationCreateFormPreview />
		</div>
	</div>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useReservationFormStore } from '@/stores/reservationFormStore'

// Props
const props = defineProps({
	teamName: {
		type: String,
		required: true
	}
})

// Stores
const reservationFormStore = useReservationFormStore()
const { teamName, step } = storeToRefs(reservationFormStore);
</script>