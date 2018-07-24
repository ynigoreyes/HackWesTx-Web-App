import * as React from 'react'
import GridItem from './components/SponsorGridItem'
import { Row } from 'antd'

class Sponsors extends React.PureComponent<{}, {}> {
  constructor(props) {
    super(props)
  }

  public mockList = [
    {
      cardTitle: 'Tyler Technologies',
      cardImage: 'https://images.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg?cs=srgb&dl=animal-animal-photography-cat-104827.jpg&fm=jpg'
    },
    {
      cardTitle: 'Just some other company',
      cardImage: 'https://images.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg?cs=srgb&dl=animal-animal-photography-cat-104827.jpg&fm=jpg'
    },
    {
      cardTitle: 'TitleFlow',
      cardImage: 'https://images.pexels.com/photos/127028/pexels-photo-127028.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
    },
    {
      cardTitle: 'Texas Tech University',
      cardImage: 'https://images.pexels.com/photos/127028/pexels-photo-127028.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
    },
    {
      cardTitle: 'Im running out of names',
      cardImage: 'https://images.pexels.com/photos/57416/cat-sweet-kitty-animals-57416.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
    },
    // {
    //   cardTitle: 'Google',
    //   cardImage: 'https://images.pexels.com/photos/57416/cat-sweet-kitty-animals-57416.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
    // },
    // {
    //   cardTitle: 'Amazon',
    //   cardImage: 'https://images.pexels.com/photos/57416/cat-sweet-kitty-animals-57416.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
    // },

  ]

  public createGrid = (each) => {
    return (
    <GridItem
      key={each.cardTitle}
      cardTitle={each.cardTitle}
      cardImage={each.cardImage}
    />
    )
  }

  public render(): JSX.Element {
    return (
      <main>
        <Row
            style={{
                display: 'flex',
                textAlign: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                flexWrap: 'wrap',
                margin: '0px',
                width: '100%',

            }}
            align='middle'
            gutter={40}
        >
          {this.mockList.map(this.createGrid)}
        </Row>
      </main>
    )
  }
}

export default Sponsors
