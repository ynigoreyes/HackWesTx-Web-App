jest.setTimeout(10000)
import * as sinon from 'sinon'
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
  it('should send back only one list of events', (done) => {
    // Needs internet to do test or else it won't fetch events from Google Calendar
    const callback = sinon.spy()
    socket.emit('update', callback)
    jest.advanceTimersByTime(10000)
    expect(callback).toHaveBeenCalledTimes(4)
  })
})
