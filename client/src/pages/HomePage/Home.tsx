import * as React from 'react'
import { Divider } from 'antd'
import Location from './components/LocationComponent'
import Sponsors from './components/SponsorsComponent'
import LandingGraphic from './components/LandingGraphicComponent'

class Home extends React.PureComponent<{}, {}> {
  constructor(props) {
    super(props)
  }

 public render(): JSX.Element {
   return (
     <main>
       <LandingGraphic/>
       <Divider orientation='right'>Where we are we located?</Divider>
       <Location />
       <Divider orientation='left'>Our Wonderful Sponsors!</Divider>
       <Sponsors />
     </main>
    )
  }
}

export default (Home)
