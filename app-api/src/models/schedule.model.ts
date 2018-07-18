import * as oauth from '../config/oauth.config'
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

  constructor(currentConn) {
    currentConn.on('ready', () => {
      console.log('Ready to pass data')
    })
    oauth.loadCredentials().then((auth) => {
      this.calendar = google.calendar({ version: 'v3', auth })
      this.setSchedule()
        .then((GoogleCalendar: object[]) => {
          this.rawSchedule = GoogleCalendar
        })
        .catch((err) => {
          console.error(err)
        })
    })
  }

  private setSchedule = () => {
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

  public getSchedule = () => {
    return new Promise((resolve, reject) => {
      this.formatSchedule()
        .then((formatedSchedule: IEventItem[]) => {
          resolve(formatedSchedule) 
        })
        .catch((err) => {
          reject(err)
        })
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

  private formatSchedule = (): Promise<IEventItem[]> => {
    return new Promise((resolve, reject) => {
      resolve(
        this.rawSchedule.map((each: any, i): IEventItem => {
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
        }),
      )
    })
  }
}

export default Scheduler
