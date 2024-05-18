import BusyEvent from '@/model/busyEvent'
import moment from 'moment'
import DateFormat from '@/utils/DateFormat'

export default {
  GetProperEndDate(endDate, startDate) {
    var properEndDate = endDate
    if (!endDate) {
      console.log('end undefine, resets to start end of day')
      properEndDate = DateFormat.GetDate(
        moment(startDate, 'YYYY-MM-DD HH:mm:ss').endOf('day').add(-1, 'hour')
      )
    } else {
      properEndDate = DateFormat.GetDate(
        moment(endDate, 'YYYY-MM-DD HH:mm:ss').endOf('day').add(-1, 'day').add(-1, 'hour')
      )
    }
    return properEndDate
  },
  ValidateNoOverlapBusyEvent(date, events) {
    if (date === null) {
      console.log('other date null')
      return
    }
    console.log('API events', events)
    var foundEvent = events.find((event) => {
      return event.start.getTime() === date.getTime()
    })
    console.log('foundEvent', foundEvent)
    if (foundEvent && foundEvent?.extendedProps?.data) {
      foundEvent = new BusyEvent(foundEvent.extendedProps.data)
      if (foundEvent?.isFull) {
        throw 'this day is not available because it is full'
      }
    }
  }
}
