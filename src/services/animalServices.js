import axios from 'axios'
axios.defaults.withCredentials = true

import Animal from '@model/animal'
let domainUrl = 'https://localhost:5188'

export default {
  findById(id) {
    return axios
      .get(`${domainUrl}/animal/${id}`)
      .then((res) => {
        return new Animal(res.data)
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
        return new Animal(res.data)
      })
      .catch((error) => {
        return error.response
      })
  },

  create(animal, file) {
    const formData = new FormData()
    formData.append('file', file)

    for (const key in animal) {
      if (Object.prototype.hasOwnProperty.call(animal, key)) {
        const value = animal[key]
        if (value instanceof Date) {
          formData.append(key, value.toISOString()) // Convert Date objects to ISO string
        } else if (typeof value === 'object' && value !== null) {
          formData.append(key, JSON.stringify(value)) // Convert other objects to JSON strings
        } else {
          formData.append(key, value)
        }
      }
    }

    return axios
      .post(`${domainUrl}/animal/create`, formData, {})
      .then((res) => {
        return new Animal(res.data)
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
