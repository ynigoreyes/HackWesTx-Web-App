import * as React from 'react'
import { Layout as AntLayout, Menu, Icon } from 'antd'
const AntHeader = AntLayout.Header

import { connect } from "react-redux";
import { push } from "react-router-redux";

import Clock from '../ClockComponent/Clock'

interface INavBarProps {
  navigateTo: (newLocation) => void
}
interface INavBarState {
  smallScreen: boolean
}

class NavBar extends React.Component<INavBarProps, INavBarState> {
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
    console.log(option.key)
    this.props.navigateTo(option.key)
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
        <Clock />
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
    window.removeEventListener('resize', this.updateScreenState)
  }
}

const mapStateToProps = (state) => {
  return {
    location: state.location,
  }
}

const mapDispatchToProps = (dispatch) => ({
  navigateTo: (location) => {
    dispatch(push(location))
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NavBar)
