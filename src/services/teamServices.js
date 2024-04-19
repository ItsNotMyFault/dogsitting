import axios from 'axios'

axios.defaults.withCredentials = true
let domainUrl = 'https://localhost:5188'
import Team from '@model/team.js'

export default {
  async getTeams() {
    console.log('getAll')

    return await axios
      .get(`${domainUrl}/teams`)
      .then((res) => {
        return res.data
      })
      .catch((error) => {
        console.error(`error during fetch teams: ${error}`)
        return error.response
      })
  },

  async create(team) {
    console.log('createteam')

    return await axios
      .post(`${domainUrl}/Team/create`, team)
      .then((res) => {
        console.log('res', res)
        return res
      })
      .catch((error) => {
        console.log('SelectMailSettings', error)
        return error.response
      })
  },

  getTeamByNormalizedName(teamNormalizedName) {
    return axios
      .get(`${domainUrl}/team/${teamNormalizedName}`)
      .then((res) => {
        return new Team(res.data)
      })
      .catch((error) => {
        console.error(`error during fetch teams: ${error}`)
        return error.response
      })
  }
}
