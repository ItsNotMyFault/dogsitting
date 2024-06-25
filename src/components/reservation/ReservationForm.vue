<template>
    <div>
        <label>date start</label>
        <VueDatePicker v-model="dateFrom" format="yyyy-MM-dd HH:mm:ss" auto-apply :min-date="minDate" />
        <label>date end</label>
        <VueDatePicker v-model="dateTo" format="yyyy-MM-dd HH:mm:ss" auto-apply :min-date="minDate" />
        <div>
            Note that hours mentioned are not fixed and might change if necessary.
        </div>
        <label>Lodger count</label>
        <input type="number" v-model="lodgerCount" min="1" max="10" step="1">
        <label> Notes</label>
        <textarea type="text" v-model="notes" rows="6" placeholder="Médicaments, horaire, info suppl+, etc." />
        <label>
            <input type="checkbox" v-model="checked">
            I accept <a href="#">conditions</a>.
        </label>
        <div class="reservationForm-addanimals">
            <AnimalSelect v-model="animals" :options="animalOptions" style="min-width: 600px;"></AnimalSelect>
            <CardAddButton class="reservationForm-addanimals-button" @click="navigateCreateAnimal()"></CardAddButton>
        </div>
        <button class="form-submit" type="text" @click="submitReservation()">Reserve</button>
    </div>
</template>
<script>
import { useReservationFormStore } from '@/stores/reservationFormStore'
import moment from 'moment'
import DateFormat from '@/utils/DateFormat'
import AnimalSelect from '@/components/animal/AnimalSelect.vue'
import AnimalList from '@/components/animal/AnimalList.vue'
import CardAddButton from '@components/buttons/CardAddButton.vue'
import userServices from '@services/userServices'
import { useAuthStore } from '@/stores/authStore'

/*
The goal with this component is making it versatile to allow future 
reservation edit form feature.
Emitting save command allows more flexibility.
*/

export default {
    name: 'ReservationForm',

    components: {
        AnimalSelect,
        CardAddButton,
        AnimalList
    },

    data() {
        const minDate = moment().add(1, 'day')
        const formattedMinDate = DateFormat.FormatToNewDate(minDate)
        const reservationFormStore = useReservationFormStore()
        return {
            reservationFormStore: reservationFormStore,
            ...reservationFormStore,
            minDate: formattedMinDate,
            animalOptions: [],
            checked: false,
        }
    },

    computed: {
        displaySelectedAnimals() {
            return this.animalOptions.filter(animalOption => this.animals.includes(animalOption.value))
        }
    },

    methods: {
        submitReservation() {
            const newReservation = {
                dateFrom: this.dateFrom,
                dateTo: this.dateTo,
                notes: this.notes,
                lodgerCount: this.lodgerCount,
                animals: this.animals
            }
            this.$emit('submit', newReservation)
        },
        navigateCreateAnimal() {
            this.$router.push({ path: `/animals/create` })
        },
    },

    async created() {
        this.reservationFormStore = useReservationFormStore()
        const authStore = useAuthStore();
        this.user = authStore.applicationUser;
        const useranimals = await userServices.getUserAnimals(authStore.applicationUser.id)
        this.animalOptions = useranimals.map(animal => animal.asOption)
        this.animals = this.reservationFormStore.getAnimals
    }


}
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