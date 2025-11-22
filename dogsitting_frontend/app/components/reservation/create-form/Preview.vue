<template>
	<div class="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 p-6">
		<div class="max-w-3xl mx-auto space-y-8">

			<!-- Title -->
			<h1 class="text-3xl font-bold text-center text-purple-600">
				Confirmation de Réservation ✨
			</h1>

			<!-- Summary Card -->
			<div class="bg-white shadow-xl rounded-2xl p-6 space-y-6 border border-purple-100">

				<!-- Dates -->
				<div class="flex items-start gap-4">
					<UIcon name="i-lucide-calendar-range" class="w-6 h-6 text-purple-500" />
					<div>
						<h2 class="font-semibold text-lg text-gray-800">Période de pension</h2>
						<p class="text-gray-600">
							{{ formatDate(labeledEvent?.dateFrom) }} →
							{{ formatDate(labeledEvent?.dateTo) }}
						</p>
					</div>
				</div>

				<!-- Lodger Count -->
				<div class="flex items-start gap-4">
					<UIcon name="i-lucide-paw-print" class="w-6 h-6 text-pink-500" />
					<div>
						<h2 class="font-semibold text-lg text-gray-800">Nombre d'animaux</h2>
						<p class="text-gray-600">{{ lodgerCount }}</p>
					</div>
				</div>

				<!-- Animals List -->
				<div class="flex items-start gap-4">
					<UIcon name="i-lucide-dog" class="w-6 h-6 text-green-500" />
					<div class="w-full">
						<h2 class="font-semibold text-lg text-gray-800">Animaux sélectionnés</h2>

						<div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
							<div v-for="animal in selectedAnimals" :key="animal.id"
								class="flex items-center gap-3 p-3 bg-purple-50 rounded-xl border border-purple-200 shadow-sm">
								<InputsImageFileDisplay v-if="animal.media" :file="animal.media?.fileData"
									class="w-12 h-12 rounded-full object-cover border border-purple-300" />
								<div>
									<p class="font-semibold text-gray-700">{{ animal.name }}</p>
									<p class="text-xs text-gray-500">{{ animal.type }} – {{ animal.breed }}</p>
								</div>
							</div>
						</div>
					</div>
				</div>

				<!-- Notes -->
				<div class="flex items-start gap-4">
					<UIcon name="i-lucide-sticky-note" class="w-6 h-6 text-blue-500" />
					<div class="w-full">
						<h2 class="font-semibold text-lg text-gray-800">Notes</h2>
						<p v-if="notes" class="text-gray-600 whitespace-pre-line">{{ notes }}</p>
						<p v-else class="text-gray-400 italic">Aucune note ajoutée</p>
					</div>
				</div>
			</div>

			<!-- Actions -->
			<div class="space-y-4">
				<UButton
					class="w-full py-4 text-lg font-semibold rounded-xl justify-center bg-gradient-to-r from-purple-500 to-pink-500 hover:scale-[1.02] shadow-md hover:shadow-lg transition-all"
					@click="confirm()">
					Confirmer la réservation ✨
				</UButton>

				<UButton variant="soft" class="w-full py-3 rounded-xl" icon="i-lucide-arrow-left" @click="step = 2">
					Retour
				</UButton>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useReservationFormStore } from "@/stores/reservationFormStore";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { useAuthStore } from '~/stores/authStore'

const router = useRouter();
const reservationFormStore = useReservationFormStore();
const authStore = useAuthStore();
const { labeledEvent, lodgerCount, notes, step } = storeToRefs(reservationFormStore);

const selectedAnimals = computed(() => {
	return reservationFormStore.selectedAnimals; // assumes populated earlier
});

const confirm = () => {
	const userId = authStore.getUserId;
	const userReservationsPath = `/reservation/user/${userId}`
	console.log("userReservationsPath", userReservationsPath);
	router.push({ path: userReservationsPath });
};

const formatDate = (d: string) => convertToDateTime(d)?.toFormat("DD - HH:mm");
</script>

<style scoped></style>
