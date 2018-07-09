import * as React from 'react'
import './Home.css'

export interface IHomeState {
  loggedIn?: boolean
}

export class Home extends React.Component<{}, IHomeState> {
  constructor(props) {
    super(props)
    this.state = {
      loggedIn: true,
    }
  }

  public render(): JSX.Element {
    return (
      <div>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit
        necessitatibus, consequuntur explicabo odio maxime natus quasi
        reprehenderit sed atque accusamus, ratione a. Dolores temporibus tempore
        perferendis sequi? Rerum, nostrum voluptates.
      </div>
    )
  }
}
