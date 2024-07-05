import axios from 'axios'

axios.defaults.withCredentials = true
let domainUrl = 'https://localhost:5188/api'

export default {
  async getAll(model) {
    return await axios
      .get(`${domainUrl}/${model}`)
      .then((res) => {
        return res.data
      })
      .catch((error) => {
        console.error(`error during fetch teams: ${error}`)
        return error.response
      })
  }
}
