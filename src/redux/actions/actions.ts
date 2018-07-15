export const updateCurrentTime = (currentTime) => {
  return {
    type: 'UPDATE_TIME',
    payload: currentTime,
  }
}

export const updateActiveRouter = (activeLocation) => {
  return {
    type: 'UPDATE_ACTIVE_ROUTE',
    payload: activeLocation,
  }
}
