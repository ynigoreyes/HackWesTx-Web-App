import * as React from 'react'
import { Timeline } from 'antd'
import './Events.css'

interface IEventsProps {}

interface IEventsState {}
export class Events extends React.Component<IEventsProps, IEventsState> {
  private TimeLineItems = [
    {
      content:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur impedit architecto, ut iste magni',
      key: 1,
    },
    {
      content:
        `nobis explicabo exercitationem! In sapiente, ex dicta accusamus,
        dolor facilis sint provident, temporibus totam autem explicabo.`,
      key: 2,
    },
    {
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
                <p>{each.content}</p>
              </Timeline.Item>
            )
          })}
        </Timeline>
      </main>
    )
  }
}
