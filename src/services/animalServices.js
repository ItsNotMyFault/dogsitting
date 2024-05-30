import axios from 'axios'
axios.defaults.withCredentials = true

import User from '@model/user'
import Animal from '@model/animal'
let domainUrl = 'https://localhost:5188'

export default {
  findById(id) {
    return axios
      .get(`${domainUrl}/animal/${id}`)
      .then((res) => {
        return new User(res.data)
      })
      .catch((error) => {
        console.error(`error during fetch teams: ${error}`)
        return error.response
      })
  },

  update(id, user) {
    return axios
      .put(`${domainUrl}/animal/edit/${id}`, user, {})
      .then((res) => {
        return new User(res.data)
      })
      .catch((error) => {
        return error.response
      })
  },

  create(user) {
    return axios
      .post(`${domainUrl}/animal/create`, user, {})
      .then((res) => {
        return new User(res.data)
      })
      .catch((error) => {
        return error.response
      })
  },

  getAnimals() {
    return axios
      .get(`${domainUrl}/animal`)
      .then((res) => {
        return res.data.map((animal) => new Animal(animal))
      })
      .catch((error) => {
        return error.response
      })
  }
}
