import * as React from 'react'
import { Link } from 'react-router-dom'

interface IEventsProps {
  title: string
}

interface IEventsState {
  loggedIn: boolean
}

export class Events extends React.Component<IEventsProps, IEventsState> {
  private relPath: string
  constructor(props) {
    super(props)
    this.relPath = props.match.url
    console.log(this.relPath)
    this.state = {
      loggedIn: true,
    }
  }
  public render(): JSX.Element {
    return (
      <div>
        This is the Events Component
        <Link to={'/event/more'}>Click Here</Link>
      </div>
    )
  }
}
