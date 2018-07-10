import * as React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import { Layout as AntLayout, Menu, Icon } from 'antd'
const { Header, Content, Footer, Sider } = AntLayout

import HeaderContent from './components/HeaderContent'
import { Home } from './HomePage/Home'
import { Events } from './EventsPage/Events'
interface IAppLayoutState {
  navigate: boolean
  navigateTo?: string
  collapsed: boolean
}

class AppLayout extends React.Component<{}, IAppLayoutState> {
  constructor(props) {
    super(props)
    this.state = {
      collapsed: window.innerWidth >= 768 ? false : true,
      navigate: false,
    }
  }

  /**
   * Reroutes user by setting state.navigate to true and rendering a Redirect
   * Must reset navigate to false once done navigating to prevent stack overflow
   */
  public handleRoute = (e) => {
    this.setState(
      {
        navigate: true,
        navigateTo: e.key,
      },
      () => {
        this.setState({
          navigate: false,
        })
      },
    )
  }

  public onCollapse = (collapsed) => {
    this.setState({ collapsed })
  }

  public render(): JSX.Element {
    const redirect = <Redirect to={`${this.state.navigateTo}`} />
    const menuItems = [
      {
        icon: 'appstore',
        name: 'Home',
        key: '/',
      },
      {
        icon: 'schedule',
        name: 'Events',
        key: '/event',
      },
    ]
    const menuStyles = {
      marginLeft: '12px',
    }
    return (
      <AntLayout style={{ minHeight: '100vh' }}>
        <Sider
          collapsible={true}
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <Menu theme="dark" defaultSelectedKeys={['/']} mode="inline">
            {menuItems.map((i) => {
              return (
                <Menu.Item onClick={this.handleRoute} key={i.key}>
                  <Icon type={i.icon} />
                  <span style={menuStyles} className="labels">
                    {i.name}
                  </span>
                </Menu.Item>
              )
            })}
          </Menu>
        </Sider>
        <AntLayout>
          <Header
            style={{
              position: 'fixed',
              zIndex: 1,
              width: '100%',
              paddingRight: '130px',
              height: '250px',
              background: '#5d5d5d',
            }}
          >
            <HeaderContent />
          </Header>
          <Content style={{ margin: '0 16px', marginTop: '275px' }}>
            {/* This is where the content will be rendered */}
            <section>
              {this.state.navigate ? redirect : null}
              <Switch>
                <Route exact={true} path="/" component={Home} />
                <Route path="/event" component={Events} />
              </Switch>
            </section>
          </Content>
          <Footer style={{ textAlign: 'center' }}>HackWesTx ©2018</Footer>
        </AntLayout>
      </AntLayout>
    )
  }
}

export default AppLayout
