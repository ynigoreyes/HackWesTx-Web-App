import * as React from 'react'
import * as ReactDOM from 'react-dom'

import './index.css'

import { Provider } from 'react-redux'
import { createBrowserHistory } from 'history'
import { createStore, applyMiddleware, compose } from 'redux'
import { logger, createLogger } from 'redux-logger'
import { ConnectedRouter as Router , connectRouter, routerMiddleware} from 'connected-react-router'

import thunk from 'redux-thunk'

const history = createBrowserHistory()
const middleware = routerMiddleware(history)

import { reducer } from './redux/reducers/global.reducers'

import AppLayout from './pages/AppLayout'

// Don't log the time updates
// TODO: Figure out how to only do this in development
const logger = createLogger({
  predicate: (getState, action) => action.type !== 'UPDATE_TIME',
})

const store = createStore(
  connectRouter(history)(reducer),
  compose(applyMiddleware(logger, middleware, thunk)),
)

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <AppLayout />
    </Router>
  </Provider>,
  document.getElementById('root') as HTMLElement,
)
