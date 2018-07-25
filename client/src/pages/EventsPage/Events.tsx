import * as React from 'react'
import io from 'socket.io-client'
import { Spin, Timeline } from 'antd'
import TimeLineItem from './components/TimeLineItemComponent/TimeLineItem'

export interface IEventItem {
  key: number | string
  title: string
  ongoing: boolean
  content: string
  startTime?: number
  endTime?: number
}

interface IEventsState {
  EventItems: IEventItem[],
  loading: boolean,
  noEvents: boolean,
}

export class Events extends React.Component<{}, IEventsState> {

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
      noEvents: false,
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
  public formatDateAndComponent = ({key, ongoing, title, content}) => {
    return (
      <TimeLineItem
        key={key}
        ongoing={ongoing}
        title={title}
        content={content}
      />
    )
  }

  public EventsStyles: React.CSSProperties = {
    margin: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }

  public render() {
    const { EventItems, loading, noEvents } = this.state
    let content

    if (loading) {
      content = <Spin size='large'/>
    } else if (noEvents) {
      content = <h1>No Events Yet! Hang Tight!</h1>
    } else {
      content = <Timeline>{EventItems.map(this.formatDateAndComponent)}</Timeline>
    }

    return (
        <main style={this.EventsStyles}>{content}</main>
    )
  }

  /**
   * Will update the current schedule when a new schedule is fetched
   */
  private watchSchedule = () => {
    this.socket.on('update', ({schedule}) => {
    let updateSchedule = false
    const currentTime = Date.now()
    const { EventItems } = this.state

      for(let prop in schedule) {
        let startTime = new Date(schedule[prop].startTime).getTime()
        let endTime = new Date(schedule[prop].endTime).getTime()

        // Determines what events are ongoing
        if (startTime < currentTime && endTime > currentTime) {
          schedule[prop].ongoing = true
        }

        // Use an if block to make sure that we don't overwrite a change event,
        // but still checking for all ongoing events
        if (!updateSchedule) {
          // If the user is receiving data for the first time or if we add/remove an event
          if (EventItems.length === 0 || EventItems.length !== schedule.length) {
            window.log('No state yet')
            updateSchedule = true
          } else if (
            // Is the content different?
            EventItems[prop].title !== schedule[prop].title ||
            EventItems[prop].content !== schedule[prop].content ||
            EventItems[prop].startTime !== schedule[prop].startTime ||
            EventItems[prop].endTime !== schedule[prop].endTime
          ) {
            updateSchedule = true
          }
        }
      }
      if (updateSchedule) {
        this.setState({
          EventItems: schedule,
          loading: false,
          noEvents: schedule.length === 0 ? true : false
        })
      }
    })
  }
}

export default Events
