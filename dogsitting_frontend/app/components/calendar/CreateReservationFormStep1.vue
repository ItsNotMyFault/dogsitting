<template>
  <div class="space-y-6">
    <div>
      <label class="block text-sm font-semibold text-gray-700 mb-2">
        Sélectionner une période ✨
      </label>
      <DateRangePicker :model-value="labeledEvent.dateFrom" @update:model-value="handleDateRangeChange"
        model-format="yyyy-MM-dd HH:mm:ss" :min-date="formattedMinDate" class="w-full" />
    </div>
    <div>
      <label class="block text-sm font-semibold text-gray-700 mb-2">
        Nombre d'animaux 🐾
      </label>
      <div class="flex items-center gap-3">
        <button type="button" @click="lodgerCount = Math.max(1, lodgerCount - 1)"
          class="w-10 h-10 rounded-full bg-purple-100 hover:bg-purple-200 text-purple-600 font-bold transition-colors">
          -
        </button>
        <UInput v-model="lodgerCount" type="number" min="1" max="10"
          class="flex-1 px-4 py-3 bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl text-center font-bold text-gray-700 focus:outline-none focus:border-purple-400" />
        <button type="button" @click="lodgerCount = Math.min(10, lodgerCount + 1)"
          class="w-10 h-10 rounded-full bg-purple-100 hover:bg-purple-200 text-purple-600 font-bold transition-colors">
          +
        </button>
      </div>
    </div>

    <!-- Notes -->
    <div>
      <label class="block text-sm font-semibold text-gray-700 mb-2">
        Notes 📝
      </label>
      <UTextarea v-model="notes" placeholder="Médicaments, horaire, info suppl., etc." :rows="4"
        class="w-full px-4 py-3 bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl resize-none focus:outline-none focus:border-purple-400 transition-colors" />
    </div>

    <!-- Checkbox -->
    <label class="flex items-center gap-3 cursor-pointer group">
      <UCheckbox v-model="checked" />
      <span class="text-sm text-gray-600 group-hover:text-gray-800">
        I accept <a href="#" class="text-purple-600 hover:text-purple-700 font-semibold">conditions</a>
      </span>
    </label>

    <!-- Submit Button -->
    <!-- :disabled="!checked || !labeledEvent.dateFrom?.start || !labeledEvent.dateFrom?.end" -->
    <UButton @click="submitReservation"
      class="w-full py-4 rounded-xl justify-center font-bold text-lg text-white transition-all duration-300 transform hover:scale-105"
      :class="{
        'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg hover:shadow-xl': isFormValid,
        'cursor-not-allowed bg-gray-400 hover:bg-gray-400': !isFormValid
      }">
      Reserve ✨
    </UButton>
  </div>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router'
//models
import DateFormat from '~/utils/DateFormat'
import { useReservationFormStore } from '@/stores/reservationFormStore'
import moment from 'moment'

const emit = defineEmits(['selected-event']);

// Router
const router = useRouter()

// Stores
const reservationFormStore = useReservationFormStore();
const { checked, labeledEvent, lodgerCount, teamName, notes, step } = storeToRefs(reservationFormStore);

// Refs
// Computed values
const minDate = moment().add(1, 'day')
const formattedMinDate = DateFormat.FormatToNewDate(minDate)

const isFormValid = computed(() => {
  return labeledEvent.value.dateFrom && checked.value && !isEmpty(labeledEvent.value.dateFrom);
});

const handleDateRangeChange = (newDateRange: { start: string; end: string }) => {
  const dateFrom = convertToDateTime(newDateRange.start);
  const dateTo = convertToDateTime(newDateRange.end);
  reservationFormStore.setLabeledEvent(dateFrom, dateTo);
};

const submitReservation = () => {
  if (!labeledEvent.value.dateFrom || !labeledEvent.value.dateTo || isEmpty(labeledEvent.value)) {
    //TODO add warning missing datefrom & dateto
    console.error('warning missing datefrom & dateto')
    return
  }
  if (!checked.value) {
    //TODO add warning not checked
    console.error('warning not checked')
    return
  }
  step.value = 2;
}




</script>