import * as React from 'react'
import * as ReactDOM from 'react-dom'

import './index.css'
import { BrowserRouter as Router } from 'react-router-dom'
import AppLayout from './pages/AppLayout';

interface IAppRouteState {
  collapsed: boolean
}

class AppRouter extends React.Component<{}, IAppRouteState> {
  constructor(props) {
    super(props)
    if (process.env.NODE_ENV !== 'production') {
      console.log(process.env)
    }
  }

  public render(): JSX.Element {
    return (
      <Router>
        <AppLayout />
      </Router>
    )
  }
}

ReactDOM.render(<AppRouter />, document.getElementById('root') as HTMLElement)
