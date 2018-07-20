import * as oauth from '../config/oauth.config'
import * as io from 'socket.io'
import { google } from 'googleapis'
import * as Debug from 'debug'

const logError = Debug('error')
const debug = Debug('dev')
const logInfo = Debug('info')

export interface IEventItem {
  key: number | string
  title: string
  ongoing: boolean
  content: string
  startTime: number
  endTime: number
}

class Scheduler {
  private calendarId = process.env.CALENDAR_ID  // ID for the HackWesTx Google Calendar
  private calendar: any                         // Calendar instance
  private rawSchedule: object[]                 // Unformated Schedule
  private schedule: IEventItem[]                // Formated Schedule
  private socket: io.Socket                     // Websocket connection
  private worker                                // worker to check the calendar for updates
  private workerPrevent: boolean

  /**
   * Loads up the raw schedule into memory and turns on the event listeners
   */
  constructor(currentConn: io.Socket) {
    this.socket = currentConn
    this.socket.on('disconnect', () => {
      logInfo('stopping worker...')
      this.workerPrevent = true
      clearInterval(this.worker)
    })

   oauth.loadCredentials().then(async (auth) => {
      try {
        this.calendar = google.calendar({ version: 'v3', auth })
        this.rawSchedule = await this.setRawSchedule()
        await this.IOready()
        debug('Ready to send/recieve information')
        if (!this.workerPrevent) this.initiateWorkers()
      } catch(err) {
        logError(err)
      }
    })
  }

  public initiateWorkers = () => {
    // When the user refreshed, we send them a packet initially
    debug('Starting workers...')
    const schedule: IEventItem[] = this.getSchedule()
    this.IOupdateCalendar({ schedule })
    this.worker = setInterval(() => {
      this.IOupdateCalendar({ schedule })
    }, 5000)
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
        }
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
      this.socket.emit('ready', { msg: 'ready to go' })
      resolve()
    })
  }

  private IOupdateCalendar = (payload: any): void => {
    if (this.schedule !== payload) {
      debug('Sending packets')
      // debug(this.schedule)
      // debug(payload)

      this.schedule = payload
      this.socket.emit('update', payload)
    } else {
      debug('Holding because of no changes')
    }
  }
}

export default Scheduler
