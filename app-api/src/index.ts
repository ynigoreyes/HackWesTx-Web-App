import * as express from 'express'
import Scheduler from './models/schedule.model'
import * as cors from 'cors'
import * as https from 'https'
import * as io from 'socket.io'
import * as Debug from 'debug'
import { readFileSync } from 'fs'
import { Set } from 'immutable'
import * as oauth from './config/oauth.config'


export const app = express()

const logError = Debug('error')
const debug = Debug('dev')
const logInfo = Debug('info')

app.use(cors({origin: true}))

export default app
const port = process.env.PORT || 8080
const keyPath = process.env.CERT_PATH + 'server.key'
const certPath = process.env.CERT_PATH + 'server.crt'

const certOptions = {
  key: readFileSync(keyPath),
  cert: readFileSync(certPath),
}

// Https Server
export const server = https.createServer(certOptions, app)
server.listen(port, () => {
  logInfo(`Listening on port: ${port}`)
  if (process.env.NODE_ENV === 'test') {
    logInfo(`Socket: Listening on port: 8000`)
  }
})

// Websocket
let socketServer: io.Server = process.env.NODE_ENV === 'test'
  ? io.listen(8000)
  : io(server)

// Get Creds for Google and open the connection
let googleAuth
let websocketConnection
let connectedUsers: Set<string> = Set([])
let connectedUser: string
oauth.loadCredentials().then((auth) => {
  const scheduler = new Scheduler(auth)

  scheduler.setRawSchedule()
    .then((rawSchedule) => {
      // Starts the workers at server start up
      if (connectedUsers.size !== 0) scheduler.initiateWorkers(true, socketServer)

      // Checks if the user has disconnected
      socketServer.on('connection', (ws: io.Socket) => {
        websocketConnection = ws
        ws.emit('connect')

        ws.on('leave', (id) => {
          //TODO: Check if that was the last user, if it was. turn off the workers
          debug('Closing a connection...')
          debug(`User ${id} just disconnected`)
          connectedUsers = connectedUsers.remove(id)
          if (connectedUsers.size === 0) {
            debug(`No more users connected. Closing stopping workers`)
            scheduler.initiateWorkers(false, null)
            debug(scheduler.formatedCalendarWorker)
          } else {
            debug(`There are still ${connectedUsers.size} user(s) connected`)
          }
        })

        // Debugging purposes
        const origin = ws.handshake.headers.origin
        debug(`Connection created from origin: ${origin}`)

        // Adds the user to the group
        ws.join('real-time-schedule', () => {
          debug(Object.keys(ws.rooms)[0])
          connectedUser = Object.keys(ws.rooms)[0]

          ws.emit('notify_connection', connectedUser)

          connectedUsers = connectedUsers.add(connectedUser)
          debug(`There are ${connectedUsers.size} user(s) connected`)

          // Check if a worker is running, if not, start it
          if (!scheduler.rawCalendarWorker) scheduler.initiateWorkers(true, socketServer)
        })

      })
    })
    .catch((err) => {
      logError(err)
    })
})

