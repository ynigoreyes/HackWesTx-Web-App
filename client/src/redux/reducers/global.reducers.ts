export interface IAppState {
  type: string
  currentTime: number
}

const GlobalReducer = (state = {}, action) => {
  switch (action.type) {
      // Add global states here
    default:
      return state
  }
}

export default GlobalReducer
