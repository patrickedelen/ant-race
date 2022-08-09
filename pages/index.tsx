import type { NextPage } from 'next'
import Head from 'next/head'

import { Button } from '@nextui-org/react'

import { useDispatch, useSelector } from "react-redux"

import { startRaceCreator } from '../store/ants'

const Main: NextPage = () => {

  const dispatch = useDispatch()

  const loadInitial = () => {
    dispatch({ type: 'load_initial_data' })
  }
  const startRace = () => {
    dispatch(startRaceCreator())
  }

  const state = useSelector((state) => state)

  console.log('state', state)

  return (
    <div>
      <Head>
        <title>Ant Race</title>
      </Head>

      <main>
        test test
        <Button onClick={loadInitial}>hi there</Button>
        <Button onClick={startRace}>start race</Button>
      </main>
    </div>
  )
}

export default Main
