import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { connectRouter, routerMiddleware} from 'connected-react-router'
import { createBrowserHistory } from 'history'

import thunk from 'redux-thunk'

import GlobalReducer from './reducers/global.reducers'
import EventReducer from './reducers/event.reducers'

const reducer = combineReducers({
  global: GlobalReducer,
  events: EventReducer,
})

export const history = createBrowserHistory()
const routerMW = routerMiddleware(history)

let middleware = [routerMW, thunk]

const initalState = {
  global: {},
  events: {
    error: false
  }
}
export const store = createStore(
  // Reducer from Connected Router, required to work with connected routes
  connectRouter(history)(reducer),
  // Initial State
  initalState,
  // Reducer Enhancer
  composeWithDevTools(applyMiddleware(...middleware)),
)

