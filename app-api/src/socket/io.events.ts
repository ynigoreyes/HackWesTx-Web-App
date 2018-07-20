import * as io from 'socket.io'

let socket: io.Socket

export const signalReady = (ws: io.Socket, data) => {
  socket = ws
  socket.emit('ready', {msg: 'ready to go!'})
}

export const updateCalendar = (ws: io.Socket, schedule) => {
  socket = ws
  socket.emit('update', { schedule })
}
