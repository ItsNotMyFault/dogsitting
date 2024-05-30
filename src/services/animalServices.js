import axios from 'axios'
axios.defaults.withCredentials = true

import User from '@model/user'
import Animal from '@model/animal'
let domainUrl = 'https://localhost:5188'

export default {
  findById(id) {
    return axios
      .get(`${domainUrl}/animals/${id}`)
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
      .put(`${domainUrl}/animals/edit/${id}`, user, {})
      .then((res) => {
        return new User(res.data)
      })
      .catch((error) => {
        return error.response
      })
  },

  getAnimals() {
    return axios
      .get(`${domainUrl}/animals`)
      .then((res) => {
        return res.data.map((animal) => new Animal(animal))
      })
      .catch((error) => {
        return error.response
      })
  }
}
