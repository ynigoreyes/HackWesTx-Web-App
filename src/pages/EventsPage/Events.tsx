import * as React from 'react'
import { Timeline } from 'antd'
import './Events.css'
import { connect } from 'react-redux'

interface IEventsProps {
  dispatch: any
}

interface IEventsState {}

interface IEventItem {
  key: number | string
  content: string
  startTime: string
  endTime: string
}
class Events extends React.Component<IEventsProps, IEventsState> {
  // Mock data for Google Calendar
  private TimeLineItems: IEventItem[] = [
    {
      startTime: '10:30',
      endTime: '11:30',
      content:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur impedit architecto, ut iste magni',
      key: 1,
    },
    {
      startTime: '12:30',
      endTime: '13:30',
      content: `nobis explicabo exercitationem! In sapiente, ex dicta accusamus,
        dolor facilis sint provident, temporibus totam autem explicabo.`,
      key: 2,
    },
    {
      startTime: '14:30',
      endTime: '15:30',
      content:
        'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nobis a doloremque non!',
      key: 3,
    },
  ]
  constructor(props) {
    super(props)
  }

  public render() {
    return (
      <main className="Events">
        <Timeline>
          {this.TimeLineItems.map((each) => {
            return (
              <Timeline.Item
                style={{ fontSize: '24px' }}
                key={each.key}
                color="green"
              >
                <h1>Title for each page</h1>
                <p>{each.content}</p>
              </Timeline.Item>
            )
          })}
        </Timeline>
      </main>
    )
  }
}

const mapStateToProp = ({ activeLocation }) => ({ activeLocation })

export default connect(mapStateToProp)(Events)
