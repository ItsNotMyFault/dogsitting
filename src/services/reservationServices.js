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
        const errorr = `${error.response.data.message}, ${error.response.data.code}`
        throw new Error(errorr)
      })
  },
  findReservationById(id) {
    var reservations = []
    reservations = axios
      .get(`${domainUrl}/reservation/${id}`)
      .then((res) => {
        return new Reservation(res.data)
      })
      .catch((error) => {
        const errorr = `${error.response.data.message}, ${error.response.data.code}`
        throw new Error(errorr)
      })
    return reservations
  },
  getReservationsByTeamName(teamName) {
    var reservations = []
    reservations = axios
      .get(`${domainUrl}/reservation/team/${teamName}`)
      .then((res) => {
        return res.data.map((reservation) => new Reservation(reservation))
      })
      .catch((error) => {
        const errorr = `${error.response.data.message}, ${error.response.data.code}`
        throw new Error(errorr)
      })
    return reservations
  },
  createReservation(reservation, teamName) {
    return axios
      .post(`${domainUrl}/reservation/${teamName}`, reservation, {})
      .then((res) => {
        return { success: true }
      })
      .catch((error) => {
        const errorr = `${error.response.data.message}, ${error.response.data.code}`
        throw new Error(errorr)
      })
  },
  saveReservationFiles(id, files) {
    const formData = new FormData()
    var fileList = Array.from(files)
    fileList.forEach((file) => {
      formData.append('files', file)
    })

    return axios
      .post(`${domainUrl}/reservation/${id}/media`, formData, {})
      .then((res) => {
        return res
      })
      .catch((error) => {
        const errorr = `${error.response.data.message}, ${error.response.data.code}`
        throw new Error(errorr)
      })
  },

  getReservationFiles(id) {
    return axios
      .get(`${domainUrl}/reservation/${id}/media`)
      .then((res) => {
        return res.data
      })
      .catch((error) => {
        const errorr = `${error.response.data.message}, ${error.response.data.code}`
        throw new Error(errorr)
      })
  },

  deleteReservationFile(id, fileId) {
    return axios.delete(`${domainUrl}/reservation/${id}/media/${fileId}`, {}).catch((error) => {
      const errorr = `${error.response.data.message}, ${error.response.data.code}`
      throw new Error(errorr)
    })
  },

  deleteReservation(reservationId) {
    return axios
      .delete(`${domainUrl}/reservation/${reservationId}`)
      .then((res) => {
        return res
      })
      .catch((error) => {
        const errorr = `${error.response.data.message}, ${error.response.data.code}`
        throw new Error(errorr)
      })
  },
  approveReservation(reservationId) {
    return axios
      .post(`${domainUrl}/reservation/${reservationId}/approve`, {})
      .then((res) => {
        return res
      })
      .catch((error) => {
        const errorr = `${error.response.data.message}, ${error.response.data.code}`
        throw new Error(errorr)
      })
  }
}
