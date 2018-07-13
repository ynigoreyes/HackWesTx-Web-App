// Mock data for Google Calendar
import { IEventItem } from '../Events'

let current = Date.now()
// This is a sorted list of events based on their start times
const TimeLineItems: IEventItem[] = [
  {
    title: 'Cupstacking!!!',
    startTime: current - 1000 * 60 * 60 * 6,
    endTime: current - 1000 * 60 * 60 * 1,
    ongoing: false,
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur impedit architecto, ut iste magni',
    key: 1,
  },
  {
    title: 'More Hacking and Food',
    startTime: current - 1000 * 60 * 60 * 1,
    endTime: current + 1000 * 60 * 60 * 1,
    ongoing: false,
    content: `nobis explicabo exercitationem! In sapiente, ex dicta accusamus,
        dolor facilis sint provident, temporibus totam autem explicabo.`,
    key: 2,
  },
  {
    title:
      'More Making fun of the Aggies. This is also an example of a long title',
    startTime: current + 1000 * 60 * 60 * 1,
    endTime: current + 1000 * 60 * 60 * 3,
    ongoing: true,
    content:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nobis a doloremque non!',
    key: 3,
  },
]

export default TimeLineItems
