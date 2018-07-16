import * as React from 'react'
import {Card, Col} from 'antd'
import './SponsorGridItem.css'

export interface IGridItemProps {
  cardTitle: string
  cardImage: string
}

const cardStyle = {
  // margin: '5px'
}

const cardCover = (imagePath) => {
  return (
    <img src={imagePath} />
  )
}

const GridItem = (props) => {
  return (
    <main className='GridItem'>
      <Col span={12} style={{padding: '9px'}} >
        <Card
          bordered
          style={cardStyle}
          cover={cardCover(props.cardImage)}
        >
        <Card.Meta title={props.cardTitle} />
        </Card>
      </Col>
    </main>

  )
}

export default GridItem
