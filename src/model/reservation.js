import User from '@model/user'
import Team from '@model/team'
import DateFormat from '@utils/DateFormat'

class Reservation {
  constructor(data) {
    if (data) {
      this.data = data
      this.title = data?.ReservationTitle
      this.id = data?.Id
      this.createdAt = data?.CreatedAt
      this.approvedAt = data?.ApprovedAt
      this.dateFrom = DateFormat.GetDateFormatted(new Date(data?.DateFrom))
      this.dateTo = DateFormat.GetDateFormatted(new Date(data?.DateTo))
      this.lodgerCount = this.data.LodgerCount
      this.client = new User(data.Client)
      this.team = new Team(data.Team) //is undefined becuase have to go through calendar.
    }
  }

  get createddaysAgo() {
    //TODO
    return 3
  }
}

export default Reservation
