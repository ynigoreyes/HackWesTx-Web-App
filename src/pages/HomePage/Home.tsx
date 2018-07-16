import * as React from 'react'
import './Home.css'
import { connect } from 'react-redux'

class Home extends React.Component<{}, {}> {
 constructor(props) {
   super(props)
 }

 public render(): JSX.Element {
   return (
     <main>
       Welcome To HackWesTx!!!
     </main>
    )
  }
}

export default connect()(Home)
