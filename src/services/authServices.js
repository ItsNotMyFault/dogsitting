import axios from 'axios'
import User from '@model/user'
axios.defaults.withCredentials = true
let domainUrl = 'https://localhost:5188'
// let domainUrl = process.env.VUE_APP_DOMAIN_API

export default {
  async FacebookOauthLogin() {
    return axios
      .get('https://localhost:5188/login')
      .then(async (res) => {
        console.log('backend login res', res)

        // return { success: true }
        const loggedInUser = await this.GetCurrentUser()
        window.open(res.request.responseURL, '_self').focus()
        return loggedInUser
      })
      .catch((error) => {
        console.error(`error during authentication: ${error}`)
        return error.response
      })
  },
  async Logout() {
    const result = await axios
      .get(`${domainUrl}/Authentication/LogOff`, {})
      .then((response) => {
        console.info('Successfully logged out', response)
        return response
      })
      .catch((error) => {
        console.info('Error when trying to log out', error)
        return error.response
      })
    return result
  },
  GetCurrentUser() {
    return axios
      .get(`${domainUrl}/authuser`)
      .then((response) => {
        return new User(response.data)
      })
      .catch((error) => {
        return error.response
      })
  },
  async GetUserLoginProviders() {
    const result = await axios
      .get(`${domainUrl}/Authentication/GetUserLoginProviders`, {})
      .then((response) => {
        return response
      })
      .catch((error) => {
        console.log(error.response)
        return error.response
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
        console.log(error.response)
        return error.response
      })
    return result
  }
}
