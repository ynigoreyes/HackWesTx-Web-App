import * as React from 'react'
import './Home.css'
import { connect } from 'react-redux'
import { Divider } from 'antd'
import Location from './components/LocationComponent'
import Sponsors from './components/SponsorsComponent'

class Home extends React.Component<{}, {}> {
  constructor(props) {
    super(props)
  }

 public render(): JSX.Element {
   return (
     <main>
       <Divider>Our Wonderful Sponsors!</Divider>
       <Sponsors />
       <Divider>Where we are we located?</Divider>
       <Location />
     </main>
    )
  }
}

export default connect()(Home)
