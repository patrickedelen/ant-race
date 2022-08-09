import { useSelector } from "react-redux"
import { Text, Row } from "@nextui-org/react"
import { useEffect, useState } from 'react'

import { Ant, AntsState } from '../store/ants'

import AntContainer from './AntContainer'

export default function AntList() {
  const ants: Ant[] = useSelector((state: AntsState) => state.ants)
  const { raceLoading, firstRaceEnded } = useSelector((state: AntsState) => (
    { raceLoading: state.raceLoading, firstRaceEnded: state.firstRaceEnded })
  )

  const [antsSorted, setAntsSorted] = useState<Ant[]>([])

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
      { antsSorted.map((ant, i) => (
        <Row css={{ marginLeft: `${ !raceLoading && firstRaceEnded ? antsSorted.length - i * 50 + 400 + 'px' : '100px' }` }}>

          <AntContainer ant={ant} key={ant.id} />
        </Row>
      ))}
    </div>
  )
}