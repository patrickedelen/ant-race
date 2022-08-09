import { useSelector } from "react-redux"
import { Card, Text, Row } from "@nextui-org/react"
import { useEffect, useState } from 'react'

const Ant = () => {

}

export default function AntList() {
  const ants = useSelector((state) => state.ants)

  const [antsSorted, setAntsSorted] = useState([])

  useEffect(() => {
    const newAnts = [...ants]
    newAnts.sort((a, b) => {
      if (a.winLikelihood > b.winLikelihood) {
        return -1
      } else if (a.winLikelihood < b.winLikelihood) {
        return 1
      } else {
        return 0
      }
    })
    setAntsSorted(newAnts)
  }, [ants])

  return (
    <div style={{ marginTop: '20px' }}>
      { ants.length === 0 && (
        <Text h2 weight="bold" css={{ textAlign: "center" }}>
          🐜󠀠🐜🐜󠀠󠀠󠀠󠀠
        </Text>
      )}
      { antsSorted.map((ant, index) => (
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