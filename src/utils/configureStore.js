import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import createReducer from './createReducers'

const sagaMiddleware = createSagaMiddleware()

export function configureStore(initialState = {}) {
  const middlewares = [
    sagaMiddleware,
  ]

  const enhancers = [
    applyMiddleware(...middlewares),
  ]

  /* eslint-disable no-underscore-dangle */
  // const composeEnhancers = process.env.NODE_ENV !== 'production'
  //   && typeof window === 'object'
  //   && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  //   ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()
  //   : compose
  /* eslint-enable */

  const store = createStore(
    createReducer({
      root: (state = {}) => state,
    }),
    initialState,
    compose(...enhancers),
  )

  store.runSaga = sagaMiddleware.run
  store.injectedReducers = {}
  store.injectedSagas = {}

  return store
}
