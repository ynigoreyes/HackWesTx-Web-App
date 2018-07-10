import * as React from 'react'
import './Clock.css'

interface IClockProps {}

interface IClockState {
  date: string | null
  time: string | null
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

  public checkTime = () => {
    this.tracker = setInterval(() => {
      this.now = new Date()
      this.setState({
        date: this.generateDate(),
        time: this.generateClock(),
      })
    }, 1000)
  }

  constructor(props) {
    super(props)
    this.state = {
      date: null,
      time: null,
    }
    this.checkTime()
  }
  /**
   * Generates a time
   * @example 8:45 am
   */
  public generateClock() {
    let newDate = this.now
    let hours = newDate.getHours();
    let minutes: any = newDate.getMinutes();
    let ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    let strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }

  private generateDate = (): string => {
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
    return `${month}, ${day}`
  }

  public render(): JSX.Element {
    return (
      <main className="Clock">
        <div className='date' >{this.state.date}</div>
        <div className='time' >{this.state.time}</div>
      </main>
    )
  }

  // Removes the memory leak with setInterval
  public componentWillUnmount() {
    clearInterval(this.tracker)
  }
}
