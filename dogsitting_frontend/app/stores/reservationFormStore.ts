import { defineStore } from 'pinia'
import { ref } from 'vue'
import reservationServices from '@/services/reservationServices.js'
import LabeledEvent from '@/model/calendar/labeledEvent'

interface CreateReservationType {
  dateFrom: string,
  dateTo: string,
  lodgerCount: number,
  notes: string,
  animals: [],
}

export const useReservationFormStore = defineStore('reservationForm', () => {
  // --- STATE ---
  const teamName = ref(null)
  const dateFrom = ref(null)
  const dateTo = ref(null)
  const lodgerCount = ref(0)
  const notes = ref(null)
  const animals = ref([])
  const checked = ref(false)
  const labeledEvent = ref<LabeledEvent>(new LabeledEvent())

  // --- GETTERS ---
  const getStateData = () => ({
    teamName: teamName.value,
    dateFrom: dateFrom.value,
    dateTo: dateTo.value,
    lodgerCount: lodgerCount.value,
    notes: notes.value,
    animals: animals.value,
  })

  const getAnimals = () => animals.value

  // --- ACTIONS ---
  const createReservation = async (reservation: CreateReservationType, providedTeamName: string) => {
    try {
      await reservationServices.createReservation(reservation, providedTeamName || teamName.value)
    } catch (error) {
      throw new Error(error)
    } finally {
      teamName.value = null
      clearForm()
    }
  }

  const setStep1Data = (data) => {
    dateFrom.value = data.dateFrom
    dateTo.value = data.dateTo
    notes.value = data.notes
    lodgerCount.value = data.lodgerCount
  }

  const setTeamName = (name) => {
    teamName.value = name
    console.log('set team name', teamName.value)
  }

  const setAnimals = (list) => {
    animals.value = list
  }

  const clearForm = () => {
    dateFrom.value = null
    dateTo.value = null
    notes.value = null
    lodgerCount.value = 0
    animals.value = []
  }

  // what the store exposes:
  return {
    // state
    teamName,
    dateFrom,
    dateTo,
    lodgerCount,
    notes,
    animals,
    checked,
    labeledEvent,

    // getters
    getStateData,
    getAnimals,

    // actions
    createReservation,
    setStep1Data,
    setTeamName,
    setAnimals,
    clearForm,
  }
})
