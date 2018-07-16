export interface IAppState {
  type: string
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
        ...state,
        currentTime: action.payload,
      }
    default:
      return state
  }
}
