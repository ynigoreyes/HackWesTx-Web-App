import * as express from 'express'
import Scheduler from './models/schedule.model'
import * as cors from 'cors'
import * as https from 'https'
import * as io from 'socket.io'
import { readFileSync } from 'fs'

export const app = express()

app.use(cors({origin: true}))

export default app

const port = process.env.PORT || 8080
const keyPath = process.env.CERT_PATH + 'server.key'
const certPath = process.env.CERT_PATH + 'server.crt'

const certOptions = {
  key: readFileSync(keyPath),
  cert: readFileSync(certPath),
}

export const server = https.createServer(certOptions, app)
server.listen(port, () => {
  console.log(`Listening on port: ${port}`)
})

// Websocket
const socket = io(server)
let allSockets = []
socket.on('connection', (ws) => {
  const origin = ws.handshake.headers.origin
  console.log(`Connection created from origin: ${origin}`)
  const newSocket = new Scheduler(ws) 
})

