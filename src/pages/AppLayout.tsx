import * as React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import { Layout as AntLayout, Menu, Icon } from 'antd'
const { Header, Content, Footer } = AntLayout

import { Home } from './HomePage/Home'
import { Events } from './EventsPage/Events'
import Clock from './components/ClockComponent/Clock'
interface IAppLayoutState {
  navigate: boolean
  navigateTo?: string
  smallScreen: boolean
  loading: boolean
}

class AppLayout extends React.Component<{}, IAppLayoutState> {
  constructor(props) {
    super(props)
    this.state = {
      navigate: false,
      smallScreen: window.innerWidth >= 768 ? false : true,
      loading: true,
    }
    this.updateScreenState = this.updateScreenState.bind(this)
  }
  public updateScreenState() {
    console.log('update')
    this.setState({
      smallScreen: window.innerWidth >= 768 ? false : true,
    })
  }

  public componentDidMount() {
    this.updateScreenState()
    window.addEventListener('resize', this.updateScreenState)
  }
  public componentWillUnmount() {
    window.removeEventListener('resize', this.updateScreenState)
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
    return (
      <AntLayout style={{ minHeight: '100vh' }}>
        <AntLayout>
          <Header
            style={{
              position: 'fixed',
              zIndex: 1,
              width: '100%',
              height: '232px',
            }}
          >
            <div
              style={{
                fontSize: this.state.smallScreen ? '40px' : '72px',
                color: 'white',
                textAlign: 'center',
              }}
            >
              HackWesTx
            </div>
            <Clock />
            <Menu
              theme="dark"
              defaultSelectedKeys={['/']}
              mode="horizontal"
              style={{
                lineHeight: '40px',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              {menuItems.map((i) => {
                return (
                  <Menu.Item
                    style={{ width: '100%', textAlign: 'center' }}
                    onClick={this.handleRoute}
                    key={i.key}
                  >
                    <Icon type={i.icon} />
                    <span className="labels">{i.name}</span>
                  </Menu.Item>
                )
              })}
            </Menu>
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
