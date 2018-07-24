import * as React from 'react'
import io from 'socket.io-client'
import { Spin, Timeline } from 'antd'
import { connect } from 'react-redux'
import TimeLineItem from './components/TimeLineItemComponent/TimeLineItem'

import './Events.css'

export interface IEventItem {
  key: number | string
  title: string
  ongoing: boolean
  content: string
  startTime?: number
  endTime?: number
}

interface IEventsProps {
  dispatch?: any
  currentTime: number
  history?: any
}

interface IEventsState {
  EventItems: IEventItem[],
  loading: boolean,
}

export class Events extends React.Component<IEventsProps, IEventsState> {

  private socket: io.Socket
  private id: string

  // Handle opening all connections
  constructor(props) {
    super(props)
    this.socket = io.connect('https://acmttu.org:3000')
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
      EventItems: [],
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
      <TimeLineItem
        key={eachEvent.key}
        ongoing={eachEvent.ongoing}
        title={eachEvent.title}
        content={eachEvent.content}
      />
    )
  }

  public render() {
    const { EventItems } = this.state
    if (this.state.loading) {
      return (
        <Spin size='large'/>
      )
    } else if (EventItems.length === 0) {
      return (
        <main className="Events">No Events yet!!!</main>
      )
    } else {
      return (
        <main className="Events">
            <Timeline>{EventItems.map(this.formatDateAndComponent)}</Timeline>
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
            EventItems: schedule,
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
