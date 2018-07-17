import * as React from 'react'
import { Route } from 'react-router-dom'
import { Layout as AntLayout } from 'antd'
const { Content } = AntLayout

import Home from './HomePage/Home'
import Events from './EventsPage/Events'
import NavBar from './LayoutContainers/NavBarComponent/NavBar'
import Footer from './LayoutContainers/FooterComponent/Footer'

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
        <Content style={{ margin: '216px 0px 0px 0px' }}>
          {/* This is where the content will be rendered */}
          <section>
            <Route exact path="/" component={Home} />
            <Route exact path="/event" component={Events} />
          </section>
        </Content>
        <Footer style={{ textAlign: 'center' }}/>
      </AntLayout>
    )
  }
}

export default AppLayout
