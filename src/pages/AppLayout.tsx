import * as React from 'react'
import { Route } from 'react-router-dom'
import { Layout as AntLayout } from 'antd'
const { Content, Footer } = AntLayout

import Home from './HomePage/Home'
import Events from './EventsPage/Events'
import NavBar from './components/NavBarComponent/NavBar'

interface IAppLayoutProps { }
interface IAppLayoutState { }

export class AppLayout extends React.Component<IAppLayoutProps, IAppLayoutState> {
  constructor(props) {
    super(props)
  }

  public render(): JSX.Element {
    return (
      <AntLayout style={{ minHeight: '100vh' }}>
        <NavBar context={this.context}/>
        <Content style={{ margin: '0 16px', marginTop: '230px' }}>
          {/* This is where the content will be rendered */}
          <section>
            <Route exact path="/" component={Home} />
            <Route exact path="/event" component={Events} />
          </section>
        </Content>
        <Footer style={{ textAlign: 'center' }}>HackWesTx ©2018</Footer>
      </AntLayout>
    )
  }
}

export default AppLayout
