import * as React from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import { Layout as AntLayout, Menu, Icon } from 'antd'
const { Header, Content, Footer } = AntLayout

import Home from './HomePage/Home'
import Events from './EventsPage/Events'
import Clock from './components/ClockComponent/Clock'
import { connect } from 'react-redux'

interface IAppLayoutProps {
  activeLocation: string
  history: any
  dispatch: any
}
interface IAppLayoutState {
  smallScreen: boolean
}

class AppLayout extends React.Component<IAppLayoutProps, IAppLayoutState> {
  constructor(props) {
    super(props)
    this.state = {
      smallScreen: window.innerWidth >= 768 ? false : true,
    }
  }
  public updateScreenState = () => {
    this.setState({
      smallScreen: window.innerWidth >= 768 ? false : true,
    })
  }

  /**
   * Reroutes user by setting state.navigate to true and rendering a Redirect
   * Must reset navigate to false once done navigating to prevent stack overflow
   */
  public handleRoute = (e) => {
    this.props.dispatch({
      type: `UPDATE_ACTIVE_ROUTE`,
      activeLocation: e.key,
    })
    const { history } = this.props
    history.push(e.key)
  }

  public render(): JSX.Element {
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
              height: '215px',
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
              defaultSelectedKeys={[`${this.props.activeLocation}`]}
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
          <Content style={{ margin: '0 16px', marginTop: '230px' }}>
            {/* This is where the content will be rendered */}
            <section>
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

  // LifeCycle
  public componentDidMount() {
    this.updateScreenState()
    window.addEventListener('resize', this.updateScreenState)
  }
  public componentWillUnmount() {
    window.removeEventListener('resize', this.updateScreenState)
  }
}

const mapStateToProp = ({ activeLocation }) => ({ activeLocation })

export default connect(mapStateToProp)(withRouter(AppLayout))
