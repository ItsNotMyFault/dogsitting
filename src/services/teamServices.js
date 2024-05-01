import axios from 'axios'

axios.defaults.withCredentials = true
let domainUrl = 'https://localhost:5188'
import Team from '@model/team.js'

export default {
  async getTeams() {
    return await axios
      .get(`${domainUrl}/teams`)
      .then((res) => {
        return res.data
      })
      .catch((error) => {
        return error.response
      })
  },

  async getUserTeams(userId) {
    return await axios
      .get(`${domainUrl}/team/user/${userId}`)
      .then((res) => {
        return res.data.map((team) => new Team(team))
      })
      .catch((error) => {
        return error.response
      })
  },

  async create(team) {
    return await axios
      .post(`${domainUrl}/Team/create`, team)
      .then((res) => {
        console.log('res', res)
        return res
      })
      .catch((error) => {
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
        return error.response
      })
  }
}
