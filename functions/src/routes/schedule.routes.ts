import { Router } from 'express'
import Schedule from '../models/Schedule.model';

const router = Router()
const scheduler = new Schedule()

router.get('/', (req, res) => {
  res.send('Hello World! v2')
  // console.log(scheduler)
})

export default router
