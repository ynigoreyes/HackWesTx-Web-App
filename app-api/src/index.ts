import * as express from 'express'
import Scheduler from './models/schedule.model'
import * as cors from 'cors'
import * as https from 'https'
import * as io from 'socket.io'
import * as Debug from 'debug'
import { readFileSync } from 'fs'
import * as oauth from './config/oauth.config'


export const app = express()

const debug = Debug('info')

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
  debug(`Listening on port: ${port}`)
  if (process.env.NODE_ENV === 'test') {
    debug(`Socket: Listening on port: 8000`)
  }
})

// Websocket
let socket: io.Server = process.env.NODE_ENV === 'test'
  ? io.listen(8000)
  : io(server)

// Get Creds for Google and open the connection
let googleAuth
oauth.loadCredentials().then((auth) => {
  socket.on('connection', (ws: io.Socket) => {
    ws.emit('connect')

    const origin = ws.handshake.headers.origin
    debug(`Connection created from origin: ${origin}`)

    const newSocket = new Scheduler(ws, auth)
    ws.join('real-time-schedule', () => {
      let rooms = Object.keys(ws.rooms)
      debug(rooms)
    })
  })

  socket.on('disconnect', () => {
    debug(`${ this.socket.handshake.headers.origin } disconnected`)
  })
})

