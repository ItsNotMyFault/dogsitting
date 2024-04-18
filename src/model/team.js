class Team {
  constructor(data) {
    this.data = data
    this.name = data?.Name
    this.phone = data?.phone
    this.email = data?.email
    this.id = data?.id
  }
}

export default Team
