import * as React from 'react'
import './Home.css'
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
       <Divider orientation='right'>Where we are we located?</Divider>
       <Location />
       <Divider orientation='left'>Our Wonderful Sponsors!</Divider>
       <Sponsors />
     </main>
    )
  }
}

export default (Home)
