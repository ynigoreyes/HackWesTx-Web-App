import * as React from 'react'
import { Timeline, Icon } from 'antd'
import './Events.css'
import { connect } from 'react-redux'
import mock from './mocks/Events.mock'

interface IEventsProps {
  dispatch?: any
  currentTime: number
}

interface IEventsState {}

export interface IEventItem {
  key: number | string
  title: string
  ongoing: boolean
  content: string
  startTime: number
  endTime: number
}
export class Events extends React.Component<IEventsProps, IEventsState> {
  private timer // A setInterval that we need to stop once the component unmounts
  private TimeLineItems: IEventItem[]

  constructor(props) {
    super(props)
    const { currentTime } = this.props as any

    this.timer =
      process.env.NODE_ENV === 'production'
        ? setInterval(this.getSchedule(currentTime), 1000)
        : setInterval(this.getMockSchedule(), 1000)
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
        color={eachEvent.ongoing ? 'blue' : 'green'}
        dot={eachEvent.ongoing ? null : (<Icon type="clock-circle-o" style={{ fontSize: '16px' }} />)}
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
    let checkTime = new Date(time)
    // This will let us check for changes in the system
    if (checkTime.getMinutes() % 5 === 0) {
      this.TimeLineItems = []
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
    }
  }

  /**
   * Gets the mock schedule
   */
  public getMockSchedule = () => {
    this.TimeLineItems = mock
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
    let debug = this.TimeLineItems.map((each) => {
      return {
        startTime: new Date(each.startTime),
        ...each,
      }
    })
    console.log(debug)
  }
}

const mapStateToProp = ({ activeLocation, currentTime }) => ({
  activeLocation,
  currentTime,
})

export default connect(mapStateToProp)(Events)