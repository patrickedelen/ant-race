import type { NextPage } from 'next'
import Head from 'next/head'

import { Button } from '@nextui-org/react'

const Main: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Ant Race</title>
      </Head>

      <main>
        test test
        <Button>hi there</Button>
      </main>
    </div>
  )
}

export default Main
