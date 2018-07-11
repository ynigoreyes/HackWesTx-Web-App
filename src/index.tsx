import * as React from 'react'
import * as ReactDOM from 'react-dom'

import './index.css'
import { Router } from 'react-router'
import AppLayout from './pages/AppLayout'

// Redux
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './redux/reducers'

const store = createStore(reducer)

// History set up
import createHistory from 'history/createBrowserHistory'
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
      <Provider store={store}>
        <Router history={history}>
          <AppLayout />
        </Router>
      </Provider>
    )
  }
}

ReactDOM.render(<AppRouter />, document.getElementById('root') as HTMLElement)
