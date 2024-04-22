import User from '@model/user'
import Team from '@model/team'
import DateFormat from '@utils/DateFormat'

class Reservation {
  constructor(data) {
    this.data = data
    this.title = data?.ReservationTitle
    this.id = data?.Id
    this.createdAt = data?.CreatedAt
    this.approvedAt = data?.ApprovedAt
    this.dateFrom = DateFormat.GetDateFormatted(new Date(data?.Period?.StartDate))
    this.dateTo = DateFormat.GetDateFormatted(new Date(data?.Period?.EndDate))
    this.lodgerCount = this.data.LodgerCount
    this.client = new User(data.Client)
    this.team = new Team(data.Team)
  }

  get createddaysAgo() {
    return 3
  }
}

export default Reservation
