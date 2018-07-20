jest.setTimeout(10000)
import * as io from 'socket.io-client'
import * as serverIo from 'socket.io'
import Scheduler from '../../src/models/schedule.model' 

describe('Schedule Suite', () => {
  let socket: io.Socket 
  beforeEach((done) => {
    // Setup
    socket = io.connect('http://localhost:8000/', {
      'reconnection delay' : 0
      , 'reopen delay' : 0
      , 'force new connection' : true
      , transports: ['websocket']
    });
    socket.on('connect', () => {
      done()
    })
    socket.on('disconnect', () => {
      socket.emit('stop')
    })
  })
  
  afterEach((done) => {
    if(socket.connected) {
      console.log('disconnecting')
      socket.disconnect()
    } 
    done()
  })
   
  it('should connect to socket', () => {
    expect(socket.connected).toBeTruthy()
  })
})
