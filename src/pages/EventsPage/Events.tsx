import * as React from 'react'
import { Timeline, Icon } from 'antd'
import './Events.css'
import { connect } from 'react-redux'
import mock from './mocks/Events.mock'

// Axios Set up
import axiosRetry from 'axios-retry'
import axios from 'axios'
const http = axios.create({
  baseURL: process.env.REACT_APP_DEV_URL 
})
axiosRetry(http, {
  retryDelay: () => 1000,
  retries: 5,
})

export interface IEventItem {
  key: number | string
  title: string
  ongoing: boolean
  content: string
  startTime: number
  endTime: number
}

interface IEventsProps {
  dispatch?: any
  currentTime: number
  history?: any
}

interface IEventsState {}
export class Events extends React.Component<IEventsProps, IEventsState> {
  private timer // A setInterval that we need to stop once the component unmounts
  private TimeLineItems: IEventItem[] = []

  constructor(props) {
    super(props)
    const { currentTime } = this.props as any

    this.timer = setInterval(this.getSchedule(currentTime), 1000)
  }

  // Clears setInterval
  public componentWillUnmount() {
    clearInterval(this.timer)
  }

  public formatDateAndComponent = (eachEvent: IEventItem) => {
    return (
      <Timeline.Item
        className="EventItem"
        key={eachEvent.key}
        color={eachEvent.ongoing
          ? 'green'
          : 'blue'}
        dot={
          eachEvent.ongoing
          ? <Icon type="clock-circle-o" style={{ fontSize: '16px' }} />
          : null
        }
      >
        <h2>{eachEvent.title}</h2>
        <p>{eachEvent.content}</p>
      </Timeline.Item>
    )
  }

  public render() {
    return (
      <main className="Events">
        <Timeline>
          {this.TimeLineItems.map(this.formatDateAndComponent)}
        </Timeline>
      </main>
    )
  }

  /**
   * Gets the schedule at every 5 minute interval
   */
  public getSchedule = (time) => {
    console.log('Check')
    let checkTime = new Date(time)
    // This will let us check for changes in the system
    // if (checkTime.getMinutes() % 5 === 0) {
      http.get('/api/v1/schedule')
        .then((res) => {
          console.log(res.data) 
          this.TimeLineItems = res.data
          for (let event in this.TimeLineItems) {
          let current = this.TimeLineItems[event]
            if (
              current.endTime > this.props.currentTime ||
              (Date.now() && current.startTime < this.props.currentTime) ||
              Date.now()
            ) {
              current.ongoing = true
              break
            }
          }
        })
        .catch((err) => {
          console.error(err)
        }
      )
    }
}

const state = (state) => {
  return {
    currentTime: state.currentTime,
  }
}

export default connect(state)(Events)
