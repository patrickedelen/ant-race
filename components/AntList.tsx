import { useSelector } from "react-redux"
import { Card, Text, Row } from "@nextui-org/react"

const Ant = () => {

}

export default function AntList() {
  const ants = useSelector((state) => state.ants)

  return (
    <div style={{ marginTop: '20px' }}>
      { ants.length === 0 && (
        <Text>
          No ants found, click Load Initial Data!
        </Text>
      )}
      { ants.map((ant, index) => (
        <Card key={ant.id} css={{ marginBottom: '20px', width: 'contain', mw: '250px' }}>
          <Card.Header css={{ border: `2px dashed ${ant.color }`, borderRadius: '14px' }}>
            <Text b css={{ textAlign: 'center', width: '100%'}}>🐜{ant.name}🐜</Text>
          </Card.Header>
          <Card.Body>
            <Row align="center">
              <Text b css={{ marginRight: '5px' }}>Length: </Text><Text>{ ant.length }</Text>
            </Row>
            <Row align="center">
              <Text b css={{ marginRight: '5px' }}>Weight: </Text><Text>{ ant.weight }</Text>
            </Row>
            <Row align="center">
              <Text b css={{ marginRight: '5px' }}>Win Likelihood: </Text><Text>{ Math.round(ant.winLikelihood * 100) }%</Text>
            </Row>
          </Card.Body>
        </Card>
      ))}
    </div>
  )
}