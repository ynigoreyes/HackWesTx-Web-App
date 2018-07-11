import * as React from 'react'
import { Spin } from 'antd'
import './Clock.css'
import { connect } from 'react-redux';

interface IClockProps {
  dispatch: any
}
interface IClockState {
  loading: boolean
  date?: string
  time?: string
}

class Clock extends React.PureComponent<
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
      loading: true,
    }
    this.checkTime()
  }

  public checkTime = (): void => {
    this.tracker = setInterval(async () => {
      this.now = new Date()
      this.setState({
        date: await this.generateDate(),
        time: await this.generateClock(),
      })
      this.props.dispatch(
        {
          type: `UPDATE_TIME`,
          currentTime: Date.now(),
        },
      )
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
    }, 1000);
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

export default connect()(Clock)
