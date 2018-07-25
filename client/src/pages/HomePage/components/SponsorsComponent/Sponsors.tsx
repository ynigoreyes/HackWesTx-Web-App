import * as React from 'react'
import GridItem from './components/SponsorGridItem'
import { Row } from 'antd'

class Sponsors extends React.PureComponent<{}, {}> {
  // Each image is 500px x 500px
  public sponsorList = [
    {
      cardTitle: 'Tyler Technologies',
      cardImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOdKXy3tn2fr2DMq6hbpJGX0fsAwxGJ-yFcnA-wtRX0wZbiVE8'
    },
    {
      cardTitle: 'Just some other company',
      cardImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOdKXy3tn2fr2DMq6hbpJGX0fsAwxGJ-yFcnA-wtRX0wZbiVE8'
    },
    {
      cardTitle: 'TitleFlow',
      cardImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOdKXy3tn2fr2DMq6hbpJGX0fsAwxGJ-yFcnA-wtRX0wZbiVE8'
    },
    {
      cardTitle: 'Texas Tech University',
      cardImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOdKXy3tn2fr2DMq6hbpJGX0fsAwxGJ-yFcnA-wtRX0wZbiVE8'
    },
    {
      cardTitle: 'Im running out of names',
      cardImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOdKXy3tn2fr2DMq6hbpJGX0fsAwxGJ-yFcnA-wtRX0wZbiVE8'
    },
    {
      cardTitle: 'Sponsor 1',
      cardImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOdKXy3tn2fr2DMq6hbpJGX0fsAwxGJ-yFcnA-wtRX0wZbiVE8'
    },
    {
      cardTitle: 'Sponsor 2',
      cardImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOdKXy3tn2fr2DMq6hbpJGX0fsAwxGJ-yFcnA-wtRX0wZbiVE8'
    },
    {
      cardTitle: 'Sponsor 3',
      cardImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOdKXy3tn2fr2DMq6hbpJGX0fsAwxGJ-yFcnA-wtRX0wZbiVE8'
    },
    {
      cardTitle: 'Sponsor 4',
      cardImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOdKXy3tn2fr2DMq6hbpJGX0fsAwxGJ-yFcnA-wtRX0wZbiVE8'
    },
    {
      cardTitle: 'Sponsor 5',
      cardImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOdKXy3tn2fr2DMq6hbpJGX0fsAwxGJ-yFcnA-wtRX0wZbiVE8'
    },
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
    const { sponsorList } = this

    return (
      <main>
        <Row
          type='flex'
          justify='center'
          align='middle'
          gutter={8}
        >
          {sponsorList.map(this.createGrid)}
        </Row>
      </main>
    )
  }
}

export default Sponsors
