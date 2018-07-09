import * as React from 'react'
import { Route, Link } from 'react-router-dom'
import { Layout as AntLayout, Menu, Icon } from 'antd'
import { Home } from './HomePage/Home'
import { Events } from './EventsPage/Events'
const { Header, Content, Footer, Sider } = AntLayout

interface IAppLayoutState {
  collapsed: boolean
}

class AppLayout extends React.Component<{}, IAppLayoutState> {
  constructor(props) {
    super(props)
    this.state = {
      collapsed: window.innerWidth >= 768 ? false : true,
    }
  }

  public onCollapse = (collapsed) => {
    console.log(collapsed)
    this.setState({ collapsed })
  }

  public render(): JSX.Element {
    return (
      <AntLayout style={{ minHeight: '100vh' }}>
        <Sider
          collapsible={true}
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1">
              <Icon type="appstore" />
              <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="schedule" />
              <Link to="/event">Events</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <AntLayout>
          <Header>HackWesTx</Header>
          <Content style={{ margin: '0 16px' }}>
            <div>
              <h2>Stuff goes here</h2>
              <Route exact={true} path="/" component={Home} />
              <Route path="/event" component={Events} />
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>HackWesTx ©2016</Footer>
        </AntLayout>
      </AntLayout>
    )
  }
}

export default AppLayout
