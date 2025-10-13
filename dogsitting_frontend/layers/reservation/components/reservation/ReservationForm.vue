<template>
    <div>
        <label>date start</label>
        <VueDatePicker v-model="dateFrom" format="yyyy-MM-dd HH:mm:ss" auto-apply :min-date="minDate" disabled />
        <label>date end</label>
        <VueDatePicker v-model="dateTo" format="yyyy-MM-dd HH:mm:ss" auto-apply :min-date="minDate" disabled />
        <div>
            Note that hours mentioned are not fixed and might change if necessary.
        </div>
        <label>Lodger count</label>
        <input type="number" v-model="lodgerCount" min="1" max="10" step="1" disabled style="color: white;">
        <label> Notes</label>
        <textarea type="text" v-model="notes" rows="6" placeholder="Médicaments, horaire, info suppl+, etc." />
        <label>
            <input type="checkbox" v-model="checked">
            I accept <a href="#">conditions</a>.
        </label>
        <div class="reservationForm-addanimals">
            <AnimalSelect v-model="animals" :options="animalOptions" style="min-width: 600px;" :limit="lodgerCount">
            </AnimalSelect>
            <CardAddButton class="reservationForm-addanimals-button" @click="navigateCreateAnimal()"></CardAddButton>
        </div>
        <button class="form-submit" type="text" @click="submitReservation()">Reserve</button>
    </div>
</template>
<script setup>

import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useReservationFormStore } from '@/stores/reservationFormStore'
import { useAuthStore } from '@/stores/authStore'
import moment from 'moment'
import DateFormat from '../../utils/DateFormat'
import AnimalSelect from '@/components/animal/AnimalSelect.vue'
import AnimalList from '@/components/animal/AnimalList.vue'
import CardAddButton from '@components/buttons/CardAddButton.vue'
import userServices from '@services/userServices'

const router = useRouter()
const reservationFormStore = useReservationFormStore()
const authStore = useAuthStore()

const { dateFrom, dateTo, notes, lodgerCount } = storeToRefs(reservationFormStore)
const animals = ref([])
const checked = ref(false)
const animalOptions = ref([])
const user = computed(() => authStore.applicationUser)
const emit = defineEmits(['submit'])

const minDate = computed(() => {
    const date = moment().add(1, 'day')
    return DateFormat.FormatToNewDate(date)
})

const submitReservation = () => {
    const newReservation = {
        dateFrom: dateFrom.value,
        dateTo: dateTo.value,
        notes: notes.value,
        lodgerCount: lodgerCount.value,
        animals: animals.value
    }
    emit('submit', newReservation)
}

const navigateCreateAnimal = () => {
    router.push({ path: `/animal/create` })
}

watch(animals, (newValue) => {
    reservationFormStore.setAnimals(newValue)
}, { deep: true })

onMounted(async () => {
    const userAnimals = await userServices.getUserAnimals(user.value.id)
    animalOptions.value = userAnimals.map(animal => animal.asOption)
    animals.value = reservationFormStore.getAnimals
})


</script>


<style>
.reservationForm-addanimals {
    display: flex;
    flex-direction: row;
    align-items: center;
}

.reservationForm-addanimals-button {
    width: 5rem !important;
    height: 5rem !important;
}
</style>