import * as React from 'react'
import { Spin } from 'antd'
import './Clock.css'

interface IClockProps {
  currentTime: Date,
}

interface IClockState {
  loading: boolean,
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
  constructor(props) {
    super(props)
    this.state = { loading: true }
  }

  public render(): JSX.Element {
    const mainContent = (
      <div className='MainContent'>
        <div className="date">{this.generateDate()}</div>
        <div className="time">{this.generateClock()}</div>
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

  /**
   * Generates a time
   * @example 8:45 am
   */
  private generateClock = (): string => {
    let newDate = new Date(this.props.currentTime)
    let hours = newDate.getHours()
    let minutes: any = newDate.getMinutes()
    let ampm = hours >= 12 ? 'pm' : 'am'
    hours = hours % 12
    hours = hours ? hours : 12 // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes
    let strTime = hours + ':' + minutes + ' ' + ampm
    return strTime
  }

  private generateDate = (): string => {
    let { currentTime } = this.props
    let newDate = new Date(currentTime)
    const month = this.months[newDate.getMonth()]
    let day = newDate.getDate().toString()
    if (day[day.length - 1] === '1') {
      day += 'st'
    } else if (day[day.length - 1] === '2') {
      day += 'nd'
    } else if (day[day.length - 1] === '3') {
      day += 'rd'
    } else {
      day += 'th'
    }
    let strDate = `${month}, ${day}`
    this.setState({
      loading: false,
    })
    return strDate
  }
}

export default Clock
