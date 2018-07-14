import * as oauth from '../config/oauth.config'

export interface IEventItem {
  key: number | string
  title: string
  ongoing: boolean
  content: string
  startTime: number
  endTime: number
}

class Schedule {
  private client: any
  private rawSchedule: any[]
  private schedule: IEventItem[]

  constructor() {
    oauth.loadCredentials().then((client) => {
      this.client = client
    })
  }

  public getSchedule = () => {
    return 'GetSchedule'
  }

  public formatSchedule = () => {
    return 'Format'
  }
}

export default Schedule
