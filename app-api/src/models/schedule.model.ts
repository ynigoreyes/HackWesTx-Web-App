import * as oauth from '../config/oauth.config'
import * as io from 'socket.io'
import { google } from 'googleapis'
import { updateCalendar } from '../socket/io.events'
import * as Debug from 'debug'

const logError = Debug('error')
const debug = Debug('dev')
const logInfo = Debug('info')

const updateFrequency = process.env.NODE_ENV === 'dev' ? 3000 : 1000 * 60

export interface IEventItem {
  key: number | string
  title: string
  ongoing: boolean
  content: string
  startTime: number
  endTime: number
}

let EventSkeleton = {
  key: '',
  title: '',
  ongoing: '',
  content: '',
  startTime: '',
  endTime: '',
}

class Scheduler {
  private calendarId = process.env.CALENDAR_ID  // ID for the HackWesTx Google Calendar
  private calendar: any                         // Calendar instance
  private rawSchedule: object[]                 // Unformated Schedule
  private schedule: IEventItem[]                // Formated Schedule

  private socket: io.Socket                     // Websocket connection

  private rawCalendarWorker                     // worker to check the actual calendar
  private formatedCalendarWorker                // worker to check the calendar for updates
  private workerPrevent: boolean

  /**
   * Loads up the raw schedule into memory and turns on the event listeners
   */
  constructor(currentConn: io.Socket, auth) {
    this.socket = currentConn
    this.socket.on('stop', () => {
      logInfo('stopping worker...')
      this.workerPrevent = true
      this.socket.disconnect(true)
      clearInterval(this.formatedCalendarWorker)
      clearInterval(this.rawCalendarWorker)
    })


    this.calendar = google.calendar({ version: 'v3', auth })
    this.setRawSchedule()
      .then((schedule) => {
        this.rawSchedule = schedule
        if (!this.workerPrevent) this.initiateWorkers()
      })
      .catch((err) => {
        logError(err)
      })
  }

  public initiateWorkers = async() => {
    // When the user refreshed, we send them a packet initially
    debug('Starting workers...')
    try {
      this.rawCalendarWorker = setInterval( async () => {
        this.rawSchedule = await this.setRawSchedule()
      }, 5000)

      let previousFetch = await this.getSchedule()
      updateCalendar(this.socket, previousFetch)
      debug(previousFetch)
      // Update the schedule and check if it changes
      this.formatedCalendarWorker = setInterval( async () => {
        this.schedule = await this.getSchedule()
        this.compareSchedule(this.schedule, previousFetch)
        if (!this.compareSchedule(this.schedule, previousFetch)) {
          debug('Sending packets...')
          updateCalendar(this.socket, this.schedule)
          previousFetch = this.schedule
        } else {
          debug('Rejecting...')
        }
      }, updateFrequency )
    } catch(err) {
      logError(err)
      this.socket.emit('error', { err })
    }
  }

  public compareSchedule = (newSched: IEventItem[], prevSched: any): boolean => {
    let attributes = Object.keys(EventSkeleton)
    if (!prevSched) {
      return false
    } else if(newSched.length !== prevSched.length) {
      return false
    } else {
      // Iterate through each object and check their attributes to ssee if anything has changed
      for (let i = 0; i < newSched.length; i++) {
        for (let j = 0; j < Object.keys(EventSkeleton).length; j++) {
          if (newSched[i][attributes[j]] !== prevSched[i][attributes[j]]) return false
        }
      }
    }
    return true
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
      try {
        this.calendar.calendarList.list((err, res) => {
          if (err) {
            reject(err)
            logError(err)
          } else if(!res.data) {
            let error = new Error('Cannot connect to Google Calendar')
            reject(error)
          }
          resolve(res.data)
        })
      } catch (err) {
        logError(err)
        logError('Cannot Connect to Google Calendar')
        this.socket.emit('error', { err })
      }
    })
  }

  private getSchedule = (): Promise<IEventItem[]> => {
    return new Promise((resolve, reject) => {
      resolve(this.rawSchedule.map((each: any, i): IEventItem => {
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
      }))
    })
  }
}

export default Scheduler
