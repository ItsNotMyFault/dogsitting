import axios from 'axios'
axios.defaults.withCredentials = true

import User from '@model/user'
let domainUrl = 'https://localhost:5188'
// let domainUrl = process.env.VUE_APP_DOMAIN_API
//userService file
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
        console.log('error', error)
        console.log('error', error.response)
        console.log('error', error.message)
        console.error(`error during fetch teams: ${error}`)
        return error.response
      })
  }
}
