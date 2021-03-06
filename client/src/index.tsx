import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as debug from 'debug'

window.log = debug('dev')
window.error = debug('error')
window.info = debug('info')

window.log(process.env)

import './index.css'

import { Provider } from 'react-redux'
import { store, history } from './redux/store'
import AppLayout from './pages/AppLayout'
import { ConnectedRouter as Router } from 'connected-react-router'

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <AppLayout />
    </Router>
  </Provider>,
  document.getElementById('root') as HTMLElement,
)
