import * as React from 'react'
import { Layout as AntLayout, Menu, Icon } from 'antd'
const AntHeader = AntLayout.Header

import { connect } from "react-redux";
import { push } from "react-router-redux";
import { updateCurrentTime } from '../../../redux/actions/global.actions'

import banner from '../../../assets/HackWesTxBannerTransparent.png'

interface INavBarProps {
  navigateTo: (newLocation) => void,
  updateCurrentTime: (time) => void,
  location: string,
  currentTime: Date,
}

interface INavBarState {
  smallScreen: boolean,
}

interface IMenuItem {
  key: string,
  name: string,
  icon: string,
}

class NavBar extends React.Component<INavBarProps, INavBarState> {

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

  /**
   * Creates the menu items
   */
  public createMenu = (item: IMenuItem) => {
    return (
      <Menu.Item
        style={{ width: '100%', textAlign: 'center' }}
        onClick={this.handleRoute}
        key={item.key}
      >
        <Icon type={item.icon} />
        <span className="labels">{item.name}</span>
      </Menu.Item>
    )

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

    const AntHeaderStyles: any = {
      position: 'fixed',
      zIndex: 1,
      width: '100%',
      height: this.state.smallScreen ? '108px' : '140px',
    }

    const bannerStyles: any = {
      width: this.state.smallScreen ? '175px' : '300px',
      margin: '12px 0px',
    }

    return (
      <AntHeader style={AntHeaderStyles} >
        <div style={{ textAlign: 'center'}}>
          <img style={bannerStyles} src={banner} alt='HackWesTx Banner'/>
        </div>
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
          {menuItems.map(this.createMenu)}
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
