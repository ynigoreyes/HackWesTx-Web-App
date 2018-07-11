export interface IAppState {
  type: string
  message: string
  activeLocation: string
  currentTime: number
}

const initState = {
  message: null,
  activeLocation: window.location.pathname,
  currentTime: null,
}

const reducer = (state = initState, action) => {
  switch (action.type) {
    case `UPDATE_TIME`:
      return {
        currentTime: action.currentTime,
      }
      break
    case `UPDATE_ACTIVE_ROUTE`:
      return {
        activeLocation: action.activeLocation,
      }
      break
    // This is used for testing if I want to set the state of the app
    case `OVERRIDE_STATE_OBJECT`:
      let newStateObject = {}
      for (let prop in action) {
        if (action.hasOwnProperty(prop) && prop !== 'type') {
          Object.assign(newStateObject, { [prop] : action[prop] })
        }
      }
      return newStateObject
      break
    default:
      return state
  }
}

export default reducer
