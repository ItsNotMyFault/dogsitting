import { RestCrudRepositoryBase } from "~/libs/repositories/RestCrudRepository";
import type { CreateCalendarDto, CalendarType, UpdateCalendarDto } from "@/model/CalendarType";
import BusyEvent from '@/model/busyEvent'
import AvailableEvent from '@/model/availableEvent'
import ReservationEvent from '@/model/reservationEvent'

export class CalendarRepositoryHttp
  extends RestCrudRepositoryBase<CalendarType, number, CreateCalendarDto, UpdateCalendarDto> {
  protected readonly resource = "/api/calendar";

  getCalendar = async (team: string | number) => {
    return await this.client(`${this.resource}/team/${team}`)
      .then((res: any) => {
        return res.data
      })
      .catch((error) => {
        console.error(`error during fetch calendar: ${error}`)
        return { error: error.message }
      })
  }

  getBusyEvents = async (team: string | number) => {
    return this.client(`${this.resource}/${team}/busyevents`)
      .then((res: any) => {
        return res.data.map((event: any) => new BusyEvent(event))
      })
      .catch((error) => {
        console.error(`error during fetch busy events: ${error}`)
        return { error: error.message }
      })
  }

  getAvailableEvents = async (team: string | number) => {
    return this.client(`${this.resource}/team/${team}/availableevents`)
      .then((res: any) => {
        var { BusyEvents, AvailableEvents } = res.data
        var busyDates = BusyEvents.map((event: any) => new BusyEvent(event))
        var availableDates = AvailableEvents.map((event: any) => new AvailableEvent(event))
        return { busyDates, availableDates }
      })
      .catch((error) => {
        console.error(`error during fetch available events: ${error}`)
        return { error: error.message }
      })
  }

  getReservationEvents = async (team: string | number) => {
    return this.client(`${this.resource}/team/${team}/reservationevents`)
      .then((res: any) => {
        return res.data.map((event: any) => new ReservationEvent(event))
      })
      .catch((error) => {
        console.error(`error during fetch reservation events: ${error}`)
        return { error: error.message }
      })
  }

  getArrivalDepartureEvents = async (team: string | number) => {
    return this.client(`${this.resource}/team/${team}/arrivaldepartureevents`)
      .then((res: any) => {
        return res.data
      })
      .catch((error) => {
        console.error(`error during fetch arrival/departure events: ${error}`)
        return { error: error.message }
      })
  }

  addAvailabilities = async (team: string | number, availabilities: any) => {
    return this.client(`${this.resource}/team/${team}/availabilities`, {
      method: 'POST',
      body: availabilities
    })
      .then((res: any) => {
        return res.data
      })
      .catch((error) => {
        console.error(`error during add availabilities: ${error}`)
        return { error: error.message }
      })
  }

  deleteAvailabilities = async (team: string | number, availabilities: any) => {
    return this.client(`${this.resource}/team/${team}/availabilities`, {
      method: 'PUT',
      body: availabilities
    })
      .then((res: any) => {
        return res.data
      })
      .catch((error) => {
        console.error(`error during delete availabilities: ${error}`)
        return { error: error.message }
      })
  }
}