import * as React from 'react'
import {Card, Col} from 'antd'
import './SponsorGridItem.css'

export interface IGridItemProps {
  cardTitle: string
  cardImage: string
}

const cardCover = (imagePath) => {
  return (
    <img src={imagePath} />
  )
}

const GridItem = (props) => {
  return (
    <Col style={{ margin: '6px' }}className='GridItem' span={5}>
      <Card
        bordered
        cover={cardCover(props.cardImage)}
        hoverable
      >
      <Card.Meta title={props.cardTitle} />
      </Card>
    </Col>
  )
}

export default GridItem
