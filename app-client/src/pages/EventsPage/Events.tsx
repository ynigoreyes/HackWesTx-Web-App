import * as React from 'react'
import io from 'socket.io-client'
import { Spin, Timeline, Icon } from 'antd'
import { connect } from 'react-redux'

import './Events.css'

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

interface IEventsState {
  TimeLineItems: IEventItem[],
  loading: boolean,
}

export class Events extends React.Component<IEventsProps, IEventsState> {

  private socket: io.Socket
  private id: string

  constructor(props) {
    super(props)
    this.socket = io.connect('https://localhost:8080')
    this.socket.on('connect', () => {
      window.log('connected')
    })
    this.socket.on('notify_connection', (id) => {
      window.log(id)
      this.id = id
    })
    this.watchSchedule()

    // initial state of no timeline items
    this.state = {
      TimeLineItems: [],
      loading: true,
    }

    // Handles the reload
    window.onbeforeunload = () => {
      this.socket.emit('leave', this.id)
      this.socket.disconnect()
    }
  }

  public componentWillUnmount() {
    window.log('Unmounting')
    this.socket.emit('leave', this.id)
    this.socket.disconnect()
  }

  /**
   *  Formats the timeline to show the current event
   */
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
    const { TimeLineItems } = this.state
    if (this.state.loading) {
      return (
        <Spin size='large'/>
      )
    } else if (TimeLineItems.length === 0) {
      return (
        <main className="Events">No Events yet!!!</main>
      )
    } else {
      return (
        <main className="Events">
            <Timeline>{TimeLineItems.map(this.formatDateAndComponent)}</Timeline>
        </main>
      )
    }
  }

  /**
   * Will update the current schedule when a new schedule is fetched
   */
  private watchSchedule = () => {
    this.socket.on('update', ({schedule}) => {
      window.log('Recieving schedule')
      const { currentTime } = this.props

      for(let prop in schedule) {

        let startTime = new Date(schedule[prop].startTime).getTime()
        let endTime = new Date(schedule[prop].endTime).getTime()

        if (startTime < currentTime && endTime > currentTime) {
          window.log('found one')
          schedule[prop].ongoing = true
          this.setState({
            TimeLineItems: schedule,
            loading: false,
          })
          break
        }
      }
    })
  }
}

const state = (state) => {
  return {
    currentTime: state.currentTime,
  }
}

export default connect(state)(Events)
