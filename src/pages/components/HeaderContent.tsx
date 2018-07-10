import * as React from 'react'
import './HeaderContent.css'
import Clock from './ClockComponent/Clock'

export default class HeaderContent extends React.PureComponent {
  public render(): JSX.Element {
    return (
      <main className="HeaderContent">
        <h1>HackWesTx</h1>
        <Clock />
      </main>
    )
  }
}
