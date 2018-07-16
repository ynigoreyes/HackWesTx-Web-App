export interface IAppState {
  type: string
  activeLocation: string
  currentTime: number
}

const initState = {
  activeLocation: window.location.pathname,
  currentTime: Date.now(),
}

export const reducer = (state = initState, action) => {
  switch (action.type) {
    case `UPDATE_TIME`:
      return {
        currentTime: action.currentTime,
        ...state,
      }
    case `UPDATE_ACTIVE_ROUTE`:
      return {
        activeLocation: action.activeLocation,
        ...state,
      }
    // This is used for testing if I want to set the state of the app
    case `OVERRIDE_STATE_OBJECT`:
      let newStateObject = {}
      for (let prop in action) {
        if (action.hasOwnProperty(prop) && prop !== 'type') {
          Object.assign(newStateObject, { [prop] : action[prop] })
        }
      }
      return newStateObject
    default:
      return state
  }
}
