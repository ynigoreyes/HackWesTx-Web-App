import * as io from 'socket.io'

export const updateCalendar = (server: io.Server, schedule) => {
  server.emit('update', { schedule })
}
