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

app.get('/', (req, res) => {
  res.send('Cannot Access API from here')
})

export default app
const port = process.env.PORT || 8080
let keyPath: string
let certPath: string
if (process.env.NODE_ENV !== 'prod') {
  // Use local creds
  keyPath = process.env.CERT_PATH + 'server.key'
  certPath = process.env.CERT_PATH + 'server.crt'
} else {
  // Will use the EC2 certifications
  keyPath = process.env.CERT_PATH + 'privkey.pem'
  certPath = process.env.CERT_PATH + 'fullchain.pem'
}

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
export let websocketConnection
export let connectedUsers: Set<string> = Set([])
let connectedUser: string

oauth.loadCredentials().then((auth) => {
  const scheduler = new Scheduler(auth)

  scheduler.setRawSchedule()
    .then((rawSchedule) => {
      // Starts the workers at server start up
      if (connectedUsers.size !== 0) scheduler.workerManager(true, socketServer)

      // Checks if the user has disconnected
      socketServer.on('connection', (ws: io.Socket) => {
        websocketConnection = ws
        ws.emit('connect')

        // Debugging purposes
        const origin = ws.handshake.headers.origin
        debug(`Connection created from origin: ${origin}`)

        // Adds the user to the group
        ws.join('real-time-schedule', () => {
          debug(Object.keys(ws.rooms)[0])
          connectedUser = Object.keys(ws.rooms)[0]

          ws.emit('notify_connection', connectedUser)
          ws.emit('ready')

          connectedUsers = connectedUsers.add(connectedUser)
          debug(`There are ${connectedUsers.size} user(s) connected`)

          // Check if a worker is running, if not, start it
          if (!scheduler.rawCalendarWorker) scheduler.workerManager(true, socketServer)
        })

        ws.on('leave', (id) => {
          debug('Closing a connection...')
          debug(`User ${id} just disconnected`)
          connectedUsers = connectedUsers.remove(id)
          if (connectedUsers.size === 0) {
            debug(`No more users connected. Closing stopping workers`)
            scheduler.workerManager(false, null)
            debug(scheduler.formatedCalendarWorker)
          } else {
            debug(`There are still ${connectedUsers.size} user(s) connected`)
          }
        })
      })
    })
    .catch((err) => {
      logError(err)
    })
})

