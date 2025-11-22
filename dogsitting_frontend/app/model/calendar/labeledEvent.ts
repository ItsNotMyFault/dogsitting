import DateFormat from '~/utils/DateFormat'
import moment from 'moment'
import type { DateTime } from 'luxon'

class LabeledEvent {

  dateFrom: DateTime | null
  dateTo: DateTime | null
  start: string | null
  end: string | null
  title: string

  constructor(dateFromStr = null, dateToStr = null, title = 'new reservation') {
    //input dates
    this.dateFrom = null
    this.dateTo = null

    this.title = title
    this.initializeDates(dateFromStr, dateToStr)
  }

  initializeDates(dateFromStr, dateToStr) {
    if (dateFromStr) {
      DateFormat.ValidateDatePastToday(dateFromStr)
    } else {
      console.warn("Can't initialize null date")
      return this
    }
    if (!this.isDateDefined(dateToStr)) {
      dateToStr = dateFromStr
    }
    this.dateFrom = moment(dateFromStr, 'YYYY-MM-DD HH:mm:ss').startOf('day')
    this.dateTo = moment(dateToStr, 'YYYY-MM-DD HH:mm:ss').endOf('day').add(-1, 'hour')
    this.start = DateFormat.GetDateFormatted(new Date(this.dateFrom))
    this.end = DateFormat.GetDateFormatted(new Date(this.dateTo))
    //-1hour is important because 1 seconds doesn't work when saving to SQL
    this.toString()
    return this
  }

  initializeDatesNew(dateFrom: DateTime, dateTo: DateTime) {
    if (isDateTimeValid(dateFrom) && isDateTimeValid(dateTo)) {
      this.dateFrom = dateFrom;
      this.dateTo = dateTo;
      this.start = dateFrom.toFormat('YYYY-MM-DD HH:mm:ss');
      this.end = dateTo.toFormat('YYYY-MM-DD HH:mm:ss');
      console.log("date initialized", this);

    }
    return this
  }

  isDateDefined(date) {
    return date !== null && date !== undefined
  }

  isDefined() {
    return this.isDateDefined(this.dateFrom)
  }

  clearInputDates() {
    this.dateFrom = null
    this.dateTo = null
    this.start = null
    this.end = null
  }

  get calendarObjectEvent() {
    return {
      start: this.start,
      end: this.end,
      title: this.title,
      borderColor: 'blue',
    }
  }

  toString() {
    console.debug(this.dateFrom, this.dateTo, this.start, this.end)
    return `${this.dateFrom} - ${this.dateTo} && ${this.start} - ${this.end}`
  }
}

export default LabeledEvent
