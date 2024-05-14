import axios from 'axios'
import Reservation from '@model/reservation'
axios.defaults.withCredentials = true
let domainUrl = 'https://localhost:5188'

export default {
  getReservationsByUserId(id) {
    return axios
      .get(`${domainUrl}/reservation/user/${id}`)
      .then((res) => {
        return res.data.map((reservation) => new Reservation(reservation))
      })
      .catch((error) => {
        return error.response
      })
  },
  getReservationsByTeamName(teamName) {
    var reservations = []
    reservations = axios
      .get(`${domainUrl}/reservation/team/${teamName}`)
      .then((res) => {
        return res.data.map((reservation) => new Reservation(reservation))
      })
      .catch((error) => {
        return error.response
      })
    return reservations
  },
  createReservation(reservation, teamName) {
    return axios
      .post(`${domainUrl}/reservation/${teamName}`, reservation)
      .then((res) => {
        return new Reservation(res.data)
      })
      .catch((error) => {
        return error.response
      })
  },
  deleteReservation(reservationId) {
    return axios
      .delete(`${domainUrl}/reservation/${reservationId}`)
      .then((res) => {
        return res
      })
      .catch((error) => {
        return error.response
      })
  }
}
