import * as React from 'react'
import { Route } from 'react-router-dom'
import { Layout as AntLayout } from 'antd'
const { Content } = AntLayout

import Home from './HomePage'
import Events from './EventsPage'
import Prizes from './PrizesPage'
import NavBar from './LayoutContainers/NavBarComponent'
import Footer from './LayoutContainers/FooterComponent'

import './AppLayout.css'

interface IAppLayoutProps { }
interface IAppLayoutState { }

export class AppLayout extends React.Component<IAppLayoutProps, IAppLayoutState> {
  constructor(props) {
    super(props)
  }

  public render(): JSX.Element {
    return (
      <AntLayout className='Layout' style={{ minHeight: '100vh' }}>
        <NavBar context={this.context}/>
        <Content className='Content'>
          {/* This is where the content will be rendered */}
          <section>
            <Route exact path="/" component={Home} />
            <Route exact path="/schedule" component={Events} />
            <Route exact path="/prizes" component={Prizes} />
          </section>
        </Content>
        <Footer style={{ textAlign: 'center' }}/>
      </AntLayout>
    )
  }
}

export default AppLayout
