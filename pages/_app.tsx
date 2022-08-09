import type { AppProps } from 'next/app'
import { NextUIProvider } from '@nextui-org/react';
import { createStore, applyMiddleware, Store } from "redux"
import { Provider } from "react-redux"
import thunk from 'redux-thunk'

import { reducer } from '../store/ants'

const store = createStore(reducer, applyMiddleware(thunk))

function MyApp({ Component, pageProps }) {
  return (
    <NextUIProvider>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </NextUIProvider>
  );
}

export default MyApp;
