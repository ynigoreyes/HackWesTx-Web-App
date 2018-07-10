import * as React from 'react'
import { Spin } from 'antd'
import './Clock.css'

interface IClockProps {}

interface IClockState {
  date: string | null
  time: string | null
  loading: boolean
}

export default class Clock extends React.PureComponent<
  IClockProps,
  IClockState
> {
  public months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]
  public now: Date
  public tracker

  constructor(props) {
    super(props)
    this.state = {
      date: null,
      time: null,
      loading: true,
    }
    console.log(this.state.loading)
    this.checkTime()
  }

  public checkTime = (): void => {
    this.tracker = setInterval(async () => {
      this.now = new Date()
      this.setState({
        date: await this.generateDate(),
        time: await this.generateClock(),
      })
    }, 1000)
  }

  public render(): JSX.Element {
    const mainContent = (
      <div className='MainContent'>
        <div className="date">{this.state.date}</div>
        <div className="time">{this.state.time}</div>
      </div>
    )
    const loadingContent = (
      <div className='LoadingContent'>
        <Spin size='large' spinning={true} />
      </div>
    )
    return (
      <main className="Clock">
        {
          this.state.loading
          ? loadingContent
          : mainContent
        }
      </main>
    )
  }

  // Handles loading state
  public componentDidMount() {
    setTimeout(() => {
      this.setState({
        loading: false,
      })
    }, 750);
  }
  // Removes the memory leak with setInterval
  public componentWillUnmount() {
    clearInterval(this.tracker)
  }

  /**
   * Generates a time
   * @example 8:45 am
   */
  private generateClock = (): Promise<string> => {
    return new Promise((resolve) => {
      let newDate = this.now
      let hours = newDate.getHours()
      let minutes: any = newDate.getMinutes()
      let ampm = hours >= 12 ? 'pm' : 'am'
      hours = hours % 12
      hours = hours ? hours : 12 // the hour '0' should be '12'
      minutes = minutes < 10 ? '0' + minutes : minutes
      let strTime = hours + ':' + minutes + ' ' + ampm
      resolve(strTime)
    })
  }

  private generateDate = (): Promise<string> => {
    return new Promise((resolve) => {
      const month = this.months[this.now.getMonth()]
      let day = this.now.getDay().toString()
      if (day[day.length - 1] === '1') {
        day += 'st'
      } else if (day[day.length - 1] === '2') {
        day += 'nd'
      } else if (day[day.length - 1] === '3') {
        day += 'rd'
      } else {
        day += 'th'
      }
      resolve(`${month}, ${day}`)
    })
  }
}
