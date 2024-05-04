import axios from 'axios'
import BusyEvent from '@model/busyEvent'
import ReservationEvent from '@model/reservationEvent'

axios.defaults.withCredentials = true
let domainUrl = 'https://localhost:5188'

export default {
  async getCalendar(team) {
    console.log('getAll')

    return await axios
      .get(`${domainUrl}/calendar/team/${team}`)
      .then((res) => {
        return res.data
      })
      .catch((error) => {
        console.error(`error during fetch teams: ${error}`)
        return error.response
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
        return error.response
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
        return error.response
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
        return error.response
      })
  }
}
