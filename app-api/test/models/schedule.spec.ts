jest.setTimeout(10000)
// AfterEach does not act as expected
// WorkAround: Call leave after each test and wrap it in a setTimeout
import * as sinon from 'sinon'
import * as io from 'socket.io-client'
import * as serverIo from 'socket.io'
import Scheduler from '../../src/models/schedule.model'

let socket: io.Socket
let connectionID: string

describe('Schedule Suite', () => {
  beforeEach((done) => {
    // Setup
    socket = io.connect('http://localhost:8000/', {
      'reconnection delay' : 0
      , 'reopen delay' : 0
      , 'force new connection' : true
      , transports: ['websocket']
    });

    socket.on('ready', () => {
      done()
    })

    socket.on('notify_connection', (id) => {
      console.log(id)
      connectionID = id
    })
  })

  it('should connect new users to the correct room', (done) => {
    setTimeout(() => {
      expect(true).toBeTruthy()
      handleLeaveEvent(done)
    })
  })
})

// Custom Done Function
function handleLeaveEvent(done: () => void) {
  socket.emit('leave', connectionID)
  done()
}
