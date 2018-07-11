import * as React from 'react'
import { connect } from 'react-redux'
import './Home.css'

export interface IHomeProps {
  activeLocation: string
  dispatch: any
}
export interface IHomeState {}

class Home extends React.Component<IHomeProps, IHomeState> {
  constructor(props) {
    super(props)
  }

  public render(): JSX.Element {
    return (
      <div>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit
        necessitatibus, consequuntur explicabo odio maxime natus quasi
        reprehenderit sed atque accusamus, ratione a. Dolores temporibus tempore
        perferendis sequi? Rerum, nostrum voluptates.
        {this.props.activeLocation}
      </div>
    )
  }
}

const mapStateToProp = ({ activeLocation }) => ({ activeLocation })

export default connect(mapStateToProp)(Home)
