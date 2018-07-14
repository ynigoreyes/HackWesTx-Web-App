import * as functions from 'firebase-functions'
import * as express from 'express'
import * as dotenv from 'dotenv'
import * as path from 'path'
import * as cors from 'cors'

import calendarRoutes from './routes/schedule.routes'

export const app = express()

dotenv.config({ path: path.join(__dirname, '/.env') })

app.use(cors({origin: true}))

app.use('/api/v1/schedule', calendarRoutes)

app.use((req, res, next) => {
  next(new Error('Not Found'))
})

// connect app to firebase
export const hackwestx = functions.https.onRequest(app)
