import * as React from 'react'
import graphic from '../../../../assets/HomePageBody.svg'
import { bounce, zoomIn } from 'react-animations';
import Radium, {StyleRoot} from 'radium';

const styles = {
  image: {
    margin: '50px 0px'
  } as React.CSSProperties,
  bounce: {
    animation: 'x 1s',
    animationName: Radium.keyframes(bounce, 'bounce')
  } as React.CSSProperties,
  zoom: {
    animation: 'x 1s',
    animationName: Radium.keyframes(zoomIn, 'zoomIn')
  } as React.CSSProperties
}

class LandingGraphic extends React.PureComponent<{}, {}> {
  public render(): JSX.Element {
    return (
      <StyleRoot style={styles.zoom}>
        <main style={styles.bounce} >
          <img style={styles.image} src={graphic} alt='Hackwestx Homepage Graphic'/>
        </main>
      </StyleRoot>
    )
  }
}

export default (LandingGraphic)
