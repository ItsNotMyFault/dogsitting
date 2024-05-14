import axios from 'axios'
import BusyEvent from '@model/busyEvent'
import AvailableEvent from '@model/availableEvent'
import ReservationEvent from '@model/reservationEvent'

axios.defaults.withCredentials = true
let domainUrl = 'https://localhost:5188'

export default {
  async getCalendar(team) {
    return await axios
      .get(`${domainUrl}/calendar/team/${team}`)
      .then((res) => {
        return res.data
      })
      .catch((error) => {
        console.error(`error during fetch teams: ${error}`)
        return { error: error.message }
      })
  },

  getBusyEvents(team) {
    return axios
      .get(`${domainUrl}/calendar/team/${team}/busyevents`)
      .then((res) => {
        return res.data.map((event) => new BusyEvent(event))
      })
      .catch((error) => {
        console.error(`error during fetch teams: ${error}`)
        return { error: error.message }
      })
  },

  getAvailableEvents(team) {
    return axios
      .get(`${domainUrl}/calendar/team/${team}/availableevents`)
      .then((res) => {
        var { BusyEvents, AvailableEvents } = res.data
        var busyDates = BusyEvents.map((event) => new BusyEvent(event))
        var availableDates = AvailableEvents.map((event) => new AvailableEvent(event))
        return { busyDates, availableDates }
      })
      .catch((error) => {
        console.error(`error during fetch teams: ${error}`)
        return { error: error.message }
      })
  },

  getReservationEvents(team) {
    return axios
      .get(`${domainUrl}/calendar/team/${team}/reservationevents`)
      .then((res) => {
        var reservationevents = res.data.map((event) => new ReservationEvent(event))
        console.log('reservationevents', reservationevents)
        return reservationevents
      })
      .catch((error) => {
        console.error(`error during fetch teams: ${error}`)
        return { error: error.message }
      })
  },

  getArrivalDepartureEvents(team) {
    return axios
      .get(`${domainUrl}/calendar/team/${team}/arrivaldepartureevents`)
      .then((res) => {
        return res.data
      })
      .catch((error) => {
        console.error(`error during fetch teams: ${error}`)
        return { error: error.message }
      })
  },

  addAvailabilities(team, availabilities) {
    return axios
      .post(`${domainUrl}/calendar/team/${team}/availabilities`, availabilities)
      .then((res) => {
        return res.data
      })
      .catch((error) => {
        console.error(`error during fetch teams: ${error}`)
        return { error: error.message }
      })
  },

  deleteAvailabilities(team, availabilities) {
    console.log('availabilities', availabilities)
    return axios
      .put(`${domainUrl}/calendar/team/${team}/availabilities`, availabilities)
      .then((res) => {
        return res.data
      })
      .catch((error) => {
        console.error(`error during fetch teams: ${error}`)
        return { error: error.message }
      })
  }
}
