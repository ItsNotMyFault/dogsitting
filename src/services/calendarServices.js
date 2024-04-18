import axios from 'axios'

axios.defaults.withCredentials = true
let domainUrl = 'https://localhost:5188'

export default {
  async getCalendar(team) {
    console.log('getAll')

    return await axios
      .get(`${domainUrl}/calendar/team/${team}`)
      .then((res) => {
        return res.data
      })
      .catch((error) => {
        console.error(`error during fetch teams: ${error}`)
        return error.response
      })
  }
}
