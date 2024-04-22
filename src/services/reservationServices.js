import axios from 'axios'
import Reservation from '@model/reservation'
axios.defaults.withCredentials = true
let domainUrl = 'https://localhost:5188'

export default {
  getUserReservations() {
    return axios
      .get(`${domainUrl}/reservation`)
      .then((res) => {
        console.log('reservations', res.data)
        return res.data.map((reservation) => new Reservation(reservation))
      })
      .catch((error) => {
        return error.response
      })
  }
}
