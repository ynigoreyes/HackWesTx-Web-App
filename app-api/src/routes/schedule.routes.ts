import { Router } from 'express'
import Schedule from '../models/schedule.model'

const router = Router()
const scheduler = new Schedule()

const check = setInterval(() => {
  if (scheduler.ready) {
    console.log('Google Calendar is ready')
    clearInterval(check)
  }
}, 250)

/**
 * Gets the schedule for the hackathon
 * End point: `/`
 * Verb: GET
 */
router.get('/', (req, res) => {
  scheduler
    .getSchedule()
    .then((cleanSchedule) => {
      res.json(cleanSchedule)
    })
    .catch((error) => {
      res.json({ error })
    })
})

/**
 * Gets the raw schedule for the hackathon
 * End point: `/raw`
 * Verb: GET
 */
router.get('/raw', (req, res) => {
  scheduler
    .getRawSchedule()
    .then((rawSchedule) => {
      res.json(rawSchedule)
    })
    .catch((error) => {
      res.json({ error })
    })
})

/**
 * Gets the list of calendars from Google
 * End point: `/list`
 * Verb: GET
 */
router.get('/list', (req, res) => {
  scheduler
    .getCalendarList()
    .then((list) => {
      res.json(list)
    })
    .catch((error) => {
      res.json({ error })
    })
})

export default router
