import { defineStore } from 'pinia'
import reservationServices from '@/services/reservationServices.js'

export const useReservationFormStore = defineStore('reservationForm', {
  persist: {
    storage: localStorage
  },

  state: () => ({
    teamName: null,
    dateFrom: null,
    dateTo: true,
    lodgerCount: false,
    notes: false,
    animals: []
  }),

  getters: {
    getStateData: (state) => state,
    getAnimals: (state) => state.animals
  },
  actions: {
    async createReservation(reservation) {
      try {
        const response = await reservationServices.createReservation(
          reservation,
          this.$state.teamName
        )
        console.log('response', response)
      } catch (error) {
        throw new Error(error)
      } finally {
        this.$state.teamName = null
      }
    },
    setStep1Data(data) {
      this.$state.dateFrom = data.dateFrom
      this.$state.dateTo = data.dateTo
      this.$state.notes = data.notes
      this.$state.lodgerCount = data.lodgerCount
    },
    async setAnimals(animals) {
      this.$state.animals = animals
    },
    setTeamName(name) {
      this.$state.teamName = name
      console.log('set team name', this.$state.teamName)
    }
  }
})
