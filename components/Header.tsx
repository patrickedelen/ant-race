import { Row, Button, Text, Loading } from '@nextui-org/react'
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

  const { hasInitialDataLoaded, raceLoading, firstRaceEnded } = useSelector((state) => state)

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
          { raceLoading && <Loading size="xs" css={{ transform: "translate(10px)" }} />}
        </Button>
      </Row>
      <Row justify="center" css={{ marginTop: "15px", marginBottom: "15px"}}>
        <Text h5 weight="bold" css={{ textAlign: "center" }}>
          { !hasInitialDataLoaded && "Click Load Initial Data to bring in the ants!" }
          { raceLoading && "Race In Progress..." }
          { firstRaceEnded && !raceLoading && "Race over! Check out the results below:"}
          
        </Text>
      </Row>
    </>
  )

}