import type { NextPage } from 'next'
import Head from 'next/head'

import { Button, Container } from '@nextui-org/react'

import { useDispatch, useSelector } from "react-redux"

import { startRaceCreator } from '../store/ants'

import Header from '../components/Header'
import AntList from '../components/AntList'

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

      <Container>
        <Header />
        <AntList />
      </Container>
    </div>
  )
}

export default Main
