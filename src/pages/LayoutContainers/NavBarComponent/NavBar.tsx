import * as React from 'react'
import { Layout as AntLayout, Menu, Icon } from 'antd'
const AntHeader = AntLayout.Header

import { connect } from "react-redux";
import { push } from "react-router-redux";
import { updateCurrentTime } from '../../../redux/actions/global.actions'

import Clock from './components/ClockComponent/Clock'

interface INavBarProps {
  navigateTo: (newLocation) => void,
  updateCurrentTime: (time) => void,
  location: string,
  currentTime: Date,
}
interface INavBarState {
  smallScreen: boolean,
}

class NavBar extends React.Component<INavBarProps, INavBarState> {

  private now: Date
  private tracker: any

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

  public handleRoute = (option) => {
    this.props.navigateTo(option.key)
  }

  public checkTime = (): void => {
    this.tracker = setInterval(() => {
      this.props.updateCurrentTime(Date.now())
    }, 1000)
  }

  public render(): JSX.Element {
    let { currentTime } = this.props
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
      <AntHeader
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
        <Clock currentTime={currentTime} />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={[this.props.location]}
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
      </AntHeader>
    )
  }

  // LifeCycle
  public componentDidMount() {
    this.updateScreenState()
    this.checkTime()
    window.addEventListener('resize', this.updateScreenState)
  }
  public componentWillUnmount() {
    clearInterval(this.tracker)
    window.removeEventListener('resize', this.updateScreenState)
  }
}

const mapStateToProps = (state) => ({
  location: state.router.location.pathname,
  currentTime: state.currentTime,
})

const mapDispatchToProps = (dispatch) => ({
  navigateTo: (location) => {
    dispatch(push(location))
  },
  updateCurrentTime: (time) => {
    dispatch(updateCurrentTime(time))
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NavBar)