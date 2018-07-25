export interface IEventState {
  error: boolean
}

const EventReducer = (state = {}, action) => {
  switch (action.type) {
    case `ERROR_RECEIVED`:
      return {
        ...state,
        error: true
      }
    case `ERROR_RESOLVED`:
      return {
        ...state,
        error: false
      }
    default:
      return state
  }
}

export default EventReducer
