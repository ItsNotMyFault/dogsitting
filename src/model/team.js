class Team {
  constructor(data) {
    this.data = data
    this.name = data?.Name
    this.normalizedName = data?.NormalizedName
    this.id = data?.Id
    this.createdAt = data?.CreatedAt
    this.approvedAt = data?.ApprovedAt
  }

  get normalizedIdentifier() {
    return this.normalizedName
  }
}

export default Team
