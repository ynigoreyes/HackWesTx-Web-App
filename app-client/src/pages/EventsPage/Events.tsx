import * as React from 'react'
import io from 'socket.io-client'
import { Timeline, Icon } from 'antd'
import { connect } from 'react-redux'
import './Events.css'
import mock from './mocks/Events.mock'

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
  private socket: any

  constructor(props) {
    super(props)
    const { currentTime } = this.props as any
    // this.socket = io('https://localhost', {transports: ['websocket', 'polling', 'flashsocket']});
    this.socket = io.connect('https://localhost') 
    this.socket.emit('ready', {msg: 'ready'})
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
  }
}

const state = (state) => {
  return {
    currentTime: state.currentTime,
  }
}

export default connect(state)(Events)
