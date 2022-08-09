import { Row, Button, Text } from '@nextui-org/react'
import { useDispatch, useSelector } from "react-redux"

import { startRaceCreator } from '../store/ants'

export default function Header() {
  const dispatch = useDispatch()

  const loadInitial = () => {
    dispatch({ type: 'load_initial_data' })
  }
  const startRace = () => {
    dispatch(startRaceCreator())
  }

  const { hasInitialDataLoaded, raceLoading } = useSelector((state) => state)

  return (
    <>
      <Row justify="center" css={{ marginTop: "30px", marginBottom: "15px"}}>
        <Text h2 weight="bold" css={{ textAlign: "center" }}>
          🐜The Great Ant Race🐜
        </Text>
      </Row>
      <Row justify="center">
        <Button onClick={loadInitial} color="gradient" bordered css={{ marginRight: "10px"}}>
          Load Ant Data
        </Button>
        <Button onClick={startRace} color="gradient" bordered>
          Start Race
        </Button>
      </Row>
    </>
  )

}