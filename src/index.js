import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import RootRouter from './pages/RootRouter'

import { configureStore } from './utils/configureStore'
// Create redux store with history
const initialState = {}
const store = configureStore(initialState)
const MOUNT_NODE = document.getElementById('app')

ReactDOM.render(
  <Provider store={store}>
    <RootRouter />
  </Provider>,
  MOUNT_NODE,
)
