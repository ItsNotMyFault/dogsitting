import axios from 'axios'

axios.defaults.withCredentials = true
let domainUrl = ''
// let domainUrl = process.env.VUE_APP_DOMAIN_API

export default {
  async FacebookOauthLogin() {
    return axios
      .get('https://localhost:5188/login')
      .then((res) => {
        console.log('facebook', res.request.responseURL)

        window.open(res.request.responseURL, '_blank').focus()
        // return await ConsumeExternalProviderAccessToken(tokenObj).then((res2) => {
        //   console.info(`successfully authenticated: ${res2}`)
        //   return res2
        // })
        return res
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
  async GetCurrentUser() {
    const result = await axios
      .get(`${domainUrl}/Authentication/GetCurrentUserAsync`)
      .then((response) => {
        return response
      })
      .catch((error) => {
        return error.response
      })
    return result
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
