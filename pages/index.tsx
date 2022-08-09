import type { NextPage } from 'next'
import Head from 'next/head'

import { Container } from '@nextui-org/react'

import Header from '../components/Header'
import AntList from '../components/AntList'

const Main: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Ant Race!</title>
      </Head>

      <Container>
        <Header />
        <AntList />
      </Container>
    </div>
  )
}

export default Main
