import axios from 'axios'
axios.defaults.withCredentials = true
import User from '#reservation/model/user'
let domainUrl = 'https://localhost:5188'
// let domainUrl = process.env.VUE_APP_DOMAIN_API

export default {
  async FacebookOauthLogin() {
    window.location.href = 'https://localhost:5188/login'
    return { success: true }
  },
  async LogoutUser() {
    return axios
      .get(`${domainUrl}/LogOff`, {})
      .then((response) => {
        console.error('Successfully logged out', response)
        return response.data
      })
      .catch((error) => {
        const errorr = `${error.response.data.message}, ${error.response.data.code}`
        throw new Error(errorr)
      })
  },
  GetCurrentUser() {
    return axios
      .get(`${domainUrl}/authuser`)
      .then((response) => {
        return new User(response.data)
      })
      .catch((error) => {
        const errorr = `${error.response.data.message}, ${error.response.data.code}`
        throw new Error(errorr)
      })
  },
  async GetUserLoginProviders() {
    const result = await axios
      .get(`${domainUrl}/Authentication/GetUserLoginProviders`, {})
      .then((response) => {
        return response
      })
      .catch((error) => {
        const errorr = `${error.response.data.message}, ${error.response.data.code}`
        throw new Error(errorr)
      })
    return result
  },
  async DeleteLoginProvider(providerName) {
    const result = await axios
      .delete(`${domainUrl}/Authentication/DeleteLoginProvider`, {
        params: { ProviderName: providerName }
      })
      .then((response) => {
        return response
      })
      .catch((error) => {
        const errorr = `${error.response.data.message}, ${error.response.data.code}`
        throw new Error(errorr)
      })
    return result
  }
}
