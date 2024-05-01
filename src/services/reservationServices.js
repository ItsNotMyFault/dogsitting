import axios from 'axios'
import Reservation from '@model/reservation'
axios.defaults.withCredentials = true
let domainUrl = 'https://localhost:5188'

export default {
  getUserReservations(id) {
    return axios
      .get(`${domainUrl}/reservation/user/${id}`)
      .then((res) => {
        console.log('reservations', res.data)
        return res.data.map((reservation) => new Reservation(reservation))
      })
      .catch((error) => {
        return error.response
      })
  },
  getTeamReservations(teamName) {
    return axios
      .get(`${domainUrl}/reservation/team/${teamName}`)
      .then((res) => {
        return res.data.map((reservation) => new Reservation(reservation))
      })
      .catch((error) => {
        return error.response
      })
  },
  createReservation(reservation, teamName) {
    return axios
      .post(`${domainUrl}/reservation/${teamName}`, reservation)
      .then((res) => {
        console.log('reservation careateion', res.data)
        //toastr
        return new Reservation(res.data)
      })
      .catch((error) => {
        return error.response
      })
  }
}
