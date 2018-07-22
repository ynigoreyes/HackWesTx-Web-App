import * as oauth from '../config/oauth.config'
import * as io from 'socket.io'
import { google } from 'googleapis'
import { updateCalendar } from '../socket/io.events'
import * as Debug from 'debug'

const logError = Debug('error')
const debug = Debug('dev')
const logInfo = Debug('info')

const dispatchFrequency = process.env.NODE_ENV === 'dev' ? 100 : 100
const fetchFrequency = process.env.NODE_ENV === 'dev' ? 5000 : 1000

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
  private schedule: IEventItem[]                // Formated Schedule
  public rawSchedule: object[]                 // Unformated Schedule

  public rawCalendarWorker                      // worker to check the actual calendar
  public formatedCalendarWorker                 // worker to check the calendar for updates
  public workerPrevent: boolean                 // Prevents the workers from spawning

  /**
   * Creates a calendar
   */
  constructor(auth) {
    this.calendar = google.calendar({ version: 'v3', auth })
  }

  /*
   * Initiates the workers to start sending packets to the client
   * @parmas { boolean } controller - determines whether or not to start or stop the workers
   * @parmas { io.Server } socket - the server instance
   */
  public workerManager = async (controller: boolean, socket: io.Server) => {
    // When the user refreshed, we send them a packet initially
    if (controller && !this.workerPrevent) {
      debug('Starting workers...')
      try {
        this.rawCalendarWorker = setInterval( async () => {
          this.rawSchedule = await this.setRawSchedule()
        }, fetchFrequency )

        let previousFetch = await this.getSchedule()
        updateCalendar(socket, previousFetch)

        // Update the schedule and check if it changes
        this.formatedCalendarWorker = setInterval( async () => {
          this.schedule = await this.getSchedule()
          this.compareSchedule(this.schedule, previousFetch)

          debug('Sending packets...')
          updateCalendar(socket, this.schedule)

        }, dispatchFrequency )

      } catch(err) {
        logError(err)
        socket.emit('error', { err })
      }
    } else {
      clearInterval(this.rawCalendarWorker)
      clearInterval(this.formatedCalendarWorker)
      // So we can easily check if the worker is running or not
      this.rawCalendarWorker = undefined
      this.formatedCalendarWorker = undefined
    }
  }

  /*
   * Compares 2 schedules and checks to see it the relevant props match
   * @return {boolean} true if everything matchs and false if there is a difference
   */
  private compareSchedule = (newSched: IEventItem[], prevSched: any): boolean => {
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
  public setRawSchedule = (): Promise<object[]> => {
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
            this.rawSchedule = data.items || []
            resolve(this.rawSchedule)
          }
        }
      )
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
}

export default Scheduler
