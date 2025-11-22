import { defineStore } from 'pinia'
import { ref } from 'vue'
import reservationServices from '@/services/reservationServices.js'
import LabeledEvent from '@/model/calendar/labeledEvent'
import type { AnimalType } from '@/model/AnimalType'
import type { DateTime } from 'luxon'

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
  const selectedAnimals = ref<AnimalType[]>([])//identifier list
  const checked = ref(false)
  const step = ref<1 | 2 | 3>(1);
  const labeledEvent = ref<LabeledEvent>(new LabeledEvent())

  // --- GETTERS ---
  const getStateData = () => ({
    teamName: teamName.value,
    dateFrom: dateFrom.value,
    dateTo: dateTo.value,
    lodgerCount: lodgerCount.value,
    notes: notes.value,
    animals: selectedAnimals.value,
  })

  const getAnimals = () => selectedAnimals.value

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

  const setLabeledEvent = (pdateFrom: DateTime, pdateTo: DateTime) => {
    console.log("setLabeledEvent---------------");
    console.log("dateFrom", dateFrom);
    console.log("dateTo", pdateTo);
    labeledEvent.value = (new LabeledEvent()).initializeDatesNew(pdateFrom, pdateTo);
    console.log("setLabeledEvent", labeledEvent.value);

    dateFrom.value = labeledEvent.value.dateFrom
    dateTo.value = labeledEvent.value.dateTo
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

  const setAnimals = (list: AnimalType[]) => {
    selectedAnimals.value = list
  }

  const clearForm = () => {
    dateFrom.value = null
    dateTo.value = null
    notes.value = null
    lodgerCount.value = 0
    selectedAnimals.value = []
  }

  // what the store exposes:
  return {
    // state
    teamName,
    dateFrom,
    dateTo,
    lodgerCount,
    notes,
    selectedAnimals,
    checked,
    labeledEvent,
    step,
    // getters
    getStateData,
    getAnimals,

    // actions
    setLabeledEvent,
    createReservation,
    setStep1Data,
    setTeamName,
    setAnimals,
    clearForm,
  }
})
