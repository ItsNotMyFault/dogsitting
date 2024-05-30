import axios from 'axios'
axios.defaults.withCredentials = true

import User from '@model/user'
import Animal from '@model/animal'
let domainUrl = 'https://localhost:5188'

export default {
  findById(id) {
    return axios
      .get(`${domainUrl}/users/${id}`)
      .then((res) => {
        return new User(res.data)
      })
      .catch((error) => {
        console.error(`error during fetch teams: ${error}`)
        return error.response
      })
  },

  update(id, user) {
    delete user.data
    return axios
      .put(`${domainUrl}/users/edit/${id}`, user, {})
      .then((res) => {
        return new User(res.data)
      })
      .catch((error) => {
        return error.response
      })
  },

  getAnimals(userId) {
    return axios
      .get(`${domainUrl}/user/${userId}/animals`)
      .then((res) => {
        return new Animal(res.data)
      })
      .catch((error) => {
        return error.response
      })
  }
}
