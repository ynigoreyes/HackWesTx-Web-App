
import * as React from 'react'
import { Timeline, Icon } from 'antd'

import { IEventItem as TimeLineItemProps } from '../../Events'

export class TimerLineItem extends React.PureComponent<TimeLineItemProps, {}> {
  constructor(props) {
    super(props)
  }
  public render() {
    const { key, ongoing, title, content } = this.props
    return (
      <Timeline.Item
        style={{ fontSize: "12px" }}
        key={key}
        color={ongoing
          ? 'green'
          : 'blue'}
        dot={
          ongoing
          ? <Icon type="clock-circle-o" style={{ fontSize: '16px' }} />
          : null
        }
      >
        <h2>{title}</h2>
        <p>{content}</p>
      </Timeline.Item>
    )
  }
}

export default TimerLineItem
