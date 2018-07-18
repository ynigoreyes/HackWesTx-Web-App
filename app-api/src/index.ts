import * as express from 'express'
import { readFileSync } from 'fs'
import * as path from 'path'
import * as cors from 'cors'
import * as https from 'https'

import calendarRoutes from './routes/schedule.routes'

export const app = express()

app.use(cors({origin: true}))

app.use('/api/v1/schedule', calendarRoutes)

app.use((req, res, next) => {
  next(new Error('Not Found'))
})

// connect app to firebase
export default app

const port = process.env.PORT || 8080
const keyPath = process.env.CERT_PATH + 'server.key'
const certPath = process.env.CERT_PATH + 'server.crt'

const certOptions = {
  key: readFileSync(keyPath),
  cert: readFileSync(certPath),
}

const server = https.createServer(certOptions, app)
server.listen(port, () => {
  console.log(`Listening on port: ${port}`)
})
