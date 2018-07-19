import * as oauth from '../config/oauth.config'
import * as io from 'socket.io'
import { google } from 'googleapis'

export interface IEventItem {
  key: number | string
  title: string
  ongoing: boolean
  content: string
  startTime: number
  endTime: number
}

class Scheduler {
  private calendar: any // Calendar instance
  private rawSchedule: object[] // Unformated Schedule
  private schedule: IEventItem[] // Formated Schedule
  private calendarId = process.env.CALENDAR_ID
  private socket

  /**
   * Loads up the raw schedule into memory and turns on the event listeners
   */
  constructor(currentConn: io.Socket) {
    this.socket = currentConn
    oauth.loadCredentials().then(async (auth) => {
      try {
        this.calendar = google.calendar({ version: 'v3', auth })
        this.rawSchedule = await this.setRawSchedule()
        await this.IOready()

        // When the user refreshed, we send them a packet initially
        this.IOupdateCalendar({schedule: this.getSchedule()})
        // setInterval(() => {
        //   this.IOupdateCalendar({schedule: this.getSchedule()})
        // }, 5000)
      } catch(err) {
        console.log(err)
      }
    })
  }

  /**
   * Sets the raw schedule
   */
  private setRawSchedule = (): Promise<object[]> => {
    return new Promise((resolve, reject) => {
      this.calendar.events.list(
        {
          calendarId: this.calendarId,
          timeMin: new Date().toISOString(),
          singleEvents: true,
          orderBy: 'startTime',
        },
        (err, { data }) => {
          if (err) {
            reject(err)
          } else {
            resolve(data.items || [])
          }
        },
      )
    })
  }

  public getCalendarList = () => {
    return new Promise((resolve, reject) => {
      this.calendar.calendarList.list((err, { data }) => {
        if (err) reject(err)
        resolve(data)
      })
    })
  }

  private getSchedule = (): IEventItem[] => {
    return this.rawSchedule.map((each: any, i): IEventItem => {
      return (
        {
          key: i + 1,
          title: each.summary,
          ongoing: false,
          content: each.description,
          startTime: each.start.dateTime,
          endTime: each.end.dateTime,
        }
      )
    })
  }

  private IOready = (): Promise<object> => {
    return new Promise((resolve, reject) => {
      this.socket.emit('ready', {msg: 'ready to go'})
      resolve()
    })
  }

  private IOupdateCalendar = (payload: object): Promise<object> => {
    return new Promise((resolve, reject) => {
      this.socket.emit('update', payload, (err) => {
        if (err) reject(err)
        resolve()
      })
    })
  }

}

export default Scheduler
