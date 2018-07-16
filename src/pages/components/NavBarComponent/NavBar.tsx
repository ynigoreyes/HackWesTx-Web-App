import * as React from 'react'
import { Layout as AntLayout, Menu, Icon } from 'antd'
const AntHeader = AntLayout.Header

import { connect } from "react-redux";
import { push } from "react-router-redux";
import { updateCurrentTime } from '../../../redux/actions/global.actions'

import Clock from '../ClockComponent/Clock'

interface INavBarProps {
  navigateTo: (newLocation) => void,
  updateCurrentTime: (time) => void,
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
    this.checkTime()
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
            // fontSize: this.state.smallScreen ? '40px' : '72px',
            fontSize: '40px',
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
    window.addEventListener('resize', this.updateScreenState)
  }
  public componentWillUnmount() {
    clearInterval(this.tracker)
    window.removeEventListener('resize', this.updateScreenState)
  }
}

const mapStateToProps = (state) => ({
  location: state.location,
  currentTime: state.currentTime,
})

const mapDispatchToProps = (dispatch) => ({
  navigateTo: (location) => {
    dispatch(push(location))
  },
  updateCurrentTime,
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NavBar)
