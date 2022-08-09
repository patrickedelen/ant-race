import { Card, Text, Row, Loading } from "@nextui-org/react"

import { Ant } from '../store/ants'

type AntContainerProps = {
  ant: Ant
}

const cardStyles = {
  marginBottom: '20px',
  width: 'contain',
  mw: '250px'
}
const headerTextStyle = {
  textAlign: 'center',
  width: '100%'
}
const infoTextStyle = {
  marginRight: '5px'
}

export default function AntContainer(props: AntContainerProps) {
  const { ant } = props
  return (
    <Card key={ant.id} css={cardStyles}>
      <Card.Header css={{ border: `2px dashed ${ant.color }`, borderRadius: '14px' }}>
        <Text b css={headerTextStyle}>🐜{ant.name}🐜</Text>
      </Card.Header>
      <Card.Body>
        <Row align="center">
          <Text b css={infoTextStyle}>Length: </Text><Text>{ ant.length }</Text>
        </Row>
        <Row align="center">
          <Text b css={infoTextStyle}>Weight: </Text><Text>{ ant.weight }</Text>
        </Row>
        <Row align="center">
          <Text b css={infoTextStyle}>Win Likelihood: </Text>
          { ant.loading ? <Loading size="xs" css={{ transform: 'translate(10px)' }} /> : (
            <Text>{ ant.winLikelihood !== 0 ? `${Math.round(ant.winLikelihood * 100) }%` : '???' }</Text>
          )}
        </Row>
      </Card.Body>
    </Card>
  )
}