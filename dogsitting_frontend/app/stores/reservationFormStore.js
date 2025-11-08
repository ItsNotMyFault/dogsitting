import { defineStore } from 'pinia'
import reservationServices from '@/services/reservationServices.js'

export const useReservationFormStore = defineStore('reservationForm', {
  state: () => ({
    teamName: null,
    dateFrom: null,
    dateTo: true,
    lodgerCount: false,
    notes: false,
    animals: [],
  }),

  getters: {
    getStateData: (state) => state,
    getAnimals: (state) => state.animals,
  },
  actions: {
    async createReservation(reservation, teamName) {
      try {
        const response = await reservationServices.createReservation(
          reservation,
          teamName || this.$state.teamName
        )
      } catch (error) {
        throw new Error(error)
      } finally {
        this.$state.teamName = null
        this.clearForm()
      }
    },
    setStep1Data(data) {
      this.$state.dateFrom = data.dateFrom
      this.$state.dateTo = data.dateTo
      this.$state.notes = data.notes
      this.$state.lodgerCount = data.lodgerCount
    },
    setTeamName(name) {
      this.$state.teamName = name
      console.log('set team name', this.$state.teamName)
    },
    setAnimals(animals) {
      this.$state.animals = animals
    },
    clearForm() {
      this.$state.dateFrom = null
      this.$state.dateTo = null
      this.$state.notes = null
      this.$state.lodgerCount = 0
      this.$state.animals = []
    },
  },
})
