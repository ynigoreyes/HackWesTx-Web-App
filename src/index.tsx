import * as React from 'react'
import * as ReactDOM from 'react-dom'

import './index.css'
import { Router } from 'react-router'
import AppLayout from './pages/AppLayout';

import createHistory from "history/createBrowserHistory"

const history = createHistory()

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
      <Router history={history}>
        <AppLayout />
      </Router>
    )
  }
}

ReactDOM.render(<AppRouter />, document.getElementById('root') as HTMLElement)
