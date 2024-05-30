class Team {
  constructor(data) {
    this.data = data
    this.name = data?.Name
    this.normalizedName = data?.NormalizedName
    this.id = data?.Id
    this.createdAt = data?.CreatedAt
    this.approvedAt = data?.ApprovedAt
    // this.useAvailabilities = true
    this.useAvailabilities = data?.UseAvailabilities
    this.useUnavailabilities = data?.UseUnavailabilities
    this.maxWeekDaysLodgerCount = data?.MaxWeekDaysLodgerCount
    this.maxWeekendDaysLodgerCount = data?.MaxWeekendDaysLodgerCount
    this.teamMediaResponses = data?.TeamMediaResponses
  }

  get normalizedIdentifier() {
    return this.normalizedName
  }
}

export default Team
