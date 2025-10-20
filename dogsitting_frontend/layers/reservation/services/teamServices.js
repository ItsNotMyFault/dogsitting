import axios from 'axios'

axios.defaults.withCredentials = true
let domainUrl = import.meta.env.VUE_APP_DOMAIN_API
import Team from '@model/team.js'

export default {
  async getTeams() {
    return await axios
      .get(`${domainUrl}/team`)
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

  findById(id) {
    return axios
      .get(`${domainUrl}/team/id/${id}`)
      .then((res) => {
        return new Team(res.data)
      })
      .catch((error) => {
        return error.response
      })
  },

  async create(team) {
    return await axios
      .post(`${domainUrl}/Team/create`, team)
      .then((res) => {
        return res
      })
      .catch((error) => {
        return error.response
      })
  },

  getTeamFiles(id) {
    return axios
      .get(`${domainUrl}/team/${id}/media`)
      .then((res) => {
        return res.data
      })
      .catch((error) => {
        // const errorr = `${error.response.data.message}, ${error.response.data.code}`
        // throw new Error(errorr)
        throw new Error(error)
      })
  },

  saveTeamFiles(id, files) {
    const formData = new FormData()
    var fileList = Array.from(files)
    console.log('fileList', fileList)
    fileList.forEach((file) => {
      formData.append('files', file.file)
      formData.append('positions', file.position) // Positions are 1-based
    })

    return axios
      .post(`${domainUrl}/team/${id}/media`, formData, {})
      .then((res) => {
        return res.data
      })
      .catch((error) => {
        console.log('error', error)
        // const errorr = `${error.response.data.message}, ${error.response.data.code}`
        // throw new Error(errorr)
      })
  },

  getTeamByNormalizedName(teamNormalizedName) {
    return axios
      .get(`${domainUrl}/team/${teamNormalizedName}`)
      .then((res) => {
        return new Team(res.data)
      })
      .catch((error) => {
        const errorr = `${error.response.data.message}, ${error.response.data.code}`
        throw new Error(errorr)
      })
  },

  update(id, team) {
    delete team.data
    delete team.approvedAt
    delete team.createdAt
    return axios
      .put(`${domainUrl}/team/edit/${id}`, team, {})
      .then((res) => {
        return new Team(res.data)
      })
      .catch((error) => {
        const errorr = `${error.response.data.message}, ${error.response.data.code}`
        throw new Error(errorr)
      })
  }
}
