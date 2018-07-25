import * as React from 'react'
import './Footer.css'

export const Footer = (props) => {
  return (
    <main className='Footer'>
      <span>
        Have any questions?
        Visit our Slack Channel and ask someone for help
      </span>
      <img className='SlackButton' src='https://cdn-images-1.medium.com/max/550/1*Zi5_XyvFuGdwS2WWb_NyvQ.png' />
    </main>
  )
}

export default Footer
