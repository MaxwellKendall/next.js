import App from 'next/app'
import React from 'react'
import { Provider } from 'react-redux'

import withReduxStore from '../redux/withRedux'

import '../styles/global.scss';

class MyApp extends App {
  render() {
    const { Component, pageProps, reduxStore } = this.props
    return (
      <Provider store={reduxStore}>
        <Component {...pageProps} />
      </Provider>
    )
  }
}

export default withReduxStore(MyApp)