import { createStore, applyMiddleware, compose } from 'redux'
import { logger, createLogger } from 'redux-logger'
import { connectRouter, routerMiddleware} from 'connected-react-router'
import { createBrowserHistory } from 'history'

import thunk from 'redux-thunk'

import { reducer } from './reducers/global.reducers'

const logger = createLogger({
  predicate: (getState, action) => action.type !== 'UPDATE_TIME',
})

export const history = createBrowserHistory()
const middleware = routerMiddleware(history)

export const store = createStore(
  connectRouter(history)(reducer),
  compose(applyMiddleware(logger, middleware, thunk)),
)

