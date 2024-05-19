import moment from 'moment'

export default {
  GetTimeAgo(date) {
    const now = moment()
    const days = now.diff(date, 'days')
    if (days <= 0) {
      const hours = now.diff(date, 'hours')
      if (hours <= 0) {
        const minutes = now.diff(date, 'minutes')
        if (minutes <= 3) {
          return 'Now'
        }
        return `${Math.abs(minutes)} minutes ago`
      }
      return `${Math.abs(hours)} hours ago`
    }
    if (days > 1) {
      return `Coming up in ${Math.abs(days)} days`
    }
    const weeks = now.diff(date, 'weeks')
    return days > 14 ? `${Math.abs(weeks)} weeks ago` : `${Math.abs(days)} days ago`
  },
  SetDateThisMonth() {
    var dateFrom = moment().startOf('month')
    var dateTo = moment().endOf('month')

    const formattedDateFrom = FormatMomentjsToNewDate(dateFrom)
    const formattedDateTo = FormatMomentjsToNewDate(dateTo)

    var daterange = [formattedDateFrom, formattedDateTo]
    return daterange
  },
  SetDateLastMonth() {
    var dateFrom = moment().subtract(1, 'month').startOf('month')
    var dateTo = moment().subtract(1, 'month').endOf('month')

    const formattedDateFrom = FormatMomentjsToNewDate(dateFrom)
    const formattedDateTo = FormatMomentjsToNewDate(dateTo)

    var daterange = [formattedDateFrom, formattedDateTo]
    return daterange
  },
  SetDateLastXMonth(monthToSubtract) {
    var dateFrom = moment().subtract(monthToSubtract, 'month').startOf('month')
    var dateTo = moment().subtract(monthToSubtract, 'month').endOf('month')

    const formattedDateFrom = FormatMomentjsToNewDate(dateFrom)
    const formattedDateTo = FormatMomentjsToNewDate(dateTo)

    var daterange = [formattedDateFrom, formattedDateTo]
    return daterange
  },
  SetDateThisWeek() {
    var dateFrom = moment().startOf('week')

    var dateTo = moment().endOf('week')
    const formattedDateFrom = FormatMomentjsToNewDate(dateFrom)
    const formattedDateTo = FormatMomentjsToNewDate(dateTo)

    var daterange = [formattedDateFrom, formattedDateTo]
    return daterange
  },
  SetDateLastWeek() {
    var dateFrom = moment().subtract(1, 'week').startOf('week')
    var dateTo = moment().subtract(1, 'week').endOf('week')

    const formattedDateFrom = FormatMomentjsToNewDate(dateFrom)
    const formattedDateTo = FormatMomentjsToNewDate(dateTo)

    var daterange = [formattedDateFrom, formattedDateTo]
    return daterange
  },
  SetDateYesterday() {
    var dateFrom = moment().subtract(1, 'day')
    var dateTo = moment().subtract(1, 'day')

    const formattedDateFrom = FormatMomentjsToNewDate(dateFrom)
    const formattedDateTo = FormatMomentjsToNewDate(dateTo)

    var daterange = [formattedDateFrom, formattedDateTo]
    return daterange
  },
  SetDateToday() {
    var dateFrom = moment()
    const formattedDateFrom = FormatMomentjsToNewDate(dateFrom)
    var daterange = [formattedDateFrom, formattedDateFrom]
    return daterange
  },
  GetDate(date) {
    if (date) {
      const momentDate = moment(date)
      const formattedDate = FormatMomentjsToNewDate(momentDate)
      return formattedDate
    } else {
      return null
    }
  },
  GetDateFormatted(date) {
    if (date) {
      const momentDate = moment(date).format('YYYY-MM-DD')
      return momentDate
    } else {
      return null
    }
  },
  GetDateTimeFormatted(date) {
    if (date) {
      const momentDate = moment(date).format('YYYY-MM-DD HH:mm:ss')
      return momentDate
    } else {
      return null
    }
  },
  GetTimeFormatted(date) {
    if (date) {
      const momentDate = moment(date).format('HH:mm:ss')
      return momentDate
    } else {
      return null
    }
  },
  GetHourTimeFormatted(date) {
    if (date) {
      const momentDate = moment(date).format('hh')
      return momentDate
    } else {
      return null
    }
  },
  GetDaysBetweenDateRange(dateFrom, dateTo) {
    if (!!dateFrom && !!dateTo) {
      const momentDateFrom = moment(dateFrom)
      const momentDateTo = moment(dateTo)
      const daysCount = momentDateTo.diff(momentDateFrom, 'days')
      return daysCount
    } else {
      return 0
    }
  },
  //get from date, from daterange
  GetDateFrom(daterange) {
    if (daterange) {
      const dateFrom = moment(daterange[0]).format('YYYY-MM-DD')
      return dateFrom
    } else {
      return null
    }
  },
  //get to date, from daterange
  GetDateTo(daterange) {
    if (daterange) {
      const dateTo = moment(daterange[1]).format('YYYY-MM-DD')
      return dateTo
    } else {
      return null
    }
  },
  GetHoursDifferenceBetweenDateRange(dateBefore, dateLater) {
    const dateLaterMoment = moment(dateLater)
    const dateBeforeMoment = moment(dateBefore)
    const duration = moment.duration(dateLaterMoment.diff(dateBeforeMoment))
    const hours = duration.asHours()
    return hours
  },
  AddYearToDate(fromDate, yearCount) {
    if (Number.isInteger(yearCount)) {
      var fromDateMoment = moment(fromDate).subtract(1, 'day').add(yearCount, 'year')

      return FormatMomentjsToNewDate(fromDateMoment)
    } else {
      return null
    }
  },
  AddAweekToDaterange(fromDate, toDate) {
    if (fromDate && toDate) {
      var momentjsDateFrom = moment(fromDate).add(1, 'weeks').startOf('week')
      var momentjsDateTo = moment(toDate).add(1, 'weeks').endOf('week')
      const formattedDateFrom = FormatMomentjsToNewDate(momentjsDateFrom)
      const formattedDateTo = FormatMomentjsToNewDate(momentjsDateTo)
      var daterange = [formattedDateFrom, formattedDateTo]
      return daterange
    } else {
      return null
    }
  },
  MinusAweekToDaterange(fromDate, toDate) {
    if (fromDate && toDate) {
      var momentjsDateFrom = moment(fromDate).add(-1, 'weeks').startOf('week')
      var momentjsDateTo = moment(toDate).add(-1, 'weeks').endOf('week')
      const formattedDateFrom = FormatMomentjsToNewDate(momentjsDateFrom)
      const formattedDateTo = FormatMomentjsToNewDate(momentjsDateTo)
      var daterange = [formattedDateFrom, formattedDateTo]
      return daterange
    } else {
      return null
    }
  },
  GetCurrentYearToDaterange() {
    const year = new Date().getFullYear()
    const FromJan = new Date(year, 0, 1)
    const ToDec = new Date(year, 11, 31)
    var daterange = [FromJan, ToDec]
    console.log('FromJan', FromJan, ' => ', ToDec)
    return daterange
  },
  GetPreviousYearToDaterange() {
    var daterangePreviousYear = this.GetCurrentYearToDaterange()
    var momentjsDateFrom = moment(daterangePreviousYear[0]).add(-1, 'year').startOf('year')
    var momentjsDateTo = moment(daterangePreviousYear[1]).add(-1, 'year').endOf('year')
    const formattedDateFrom = FormatMomentjsToNewDate(momentjsDateFrom)
    const formattedDateTo = FormatMomentjsToNewDate(momentjsDateTo)
    var daterange = [formattedDateFrom, formattedDateTo]
    return daterange
  },
  MinusAYearToDaterange(fromDate, toDate) {
    if (fromDate && toDate) {
      var momentjsDateFrom = moment(fromDate).add(-1, 'year').startOf('year')
      var momentjsDateTo = moment(toDate).add(-1, 'year').endOf('year')
      const formattedDateFrom = FormatMomentjsToNewDate(momentjsDateFrom)
      const formattedDateTo = FormatMomentjsToNewDate(momentjsDateTo)
      var daterange = [formattedDateFrom, formattedDateTo]
      return daterange
    } else {
      return null
    }
  },
  FormatToNewDate(date) {
    return FormatMomentjsToNewDate(date)
  },
  GetWeekDayArray() {
    var weekday = new Array(7)
    weekday[0] = 'Dimanche'
    weekday[1] = 'Lundi'
    weekday[2] = 'Mardi'
    weekday[3] = 'Mercredi'
    weekday[4] = 'Jeudi'
    weekday[5] = 'Vendredi'
    weekday[6] = 'Samedi'
    return weekday
  },
  GetMonthArray() {
    var weekday = new Array(7)
    weekday[0] = 'Janvier'
    weekday[1] = 'Février'
    weekday[2] = 'Mars'
    weekday[3] = 'Avril'
    weekday[4] = 'Mai'
    weekday[5] = 'Juin'
    weekday[6] = 'Juillet'
    weekday[7] = 'Août'
    weekday[8] = 'Septembre'
    weekday[9] = 'Octobre'
    weekday[10] = 'Novembre'
    weekday[11] = 'Décembre'
    return weekday
  },
  GetPreviousDay(date) {
    return moment(date).add(-1, 'day')
  },
  ValidateDatePastToday(date) {
    const momentDate = moment(date, 'YYYY-MM-DD')
    if (momentDate.isSameOrBefore(moment(), 'day')) {
      throw 'Invalid date'
    }
    return true
  },
  GetDailyDates(startDate, endDate) {
    let start = moment(startDate)
    const end = moment(endDate)
    let dates = []
    while (start.isSameOrBefore(end)) {
      dates.push(FormatMomentjsToNewDate(start))
      start.add(1, 'days')
    }

    return dates
  }
}

function FormatMomentjsToNewDate(date) {
  const year = date.year()
  const month = date.month()
  const day = date.date()
  return new Date(year, month, day)
}
