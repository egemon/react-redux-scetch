import R from 'ramda'
import invariant from 'invariant'

import checkStore from './checkStore'
import createReducer from '../createReducers'

export function injectReducerFactory(store, isValid) {
  return function injectReducer(key, reducer) {
    if (!isValid) checkStore(store)

    invariant(
      R.is(String, key) && !R.isEmpty(key) && R.is(Function, reducer),
      '(app/utils...) injectReducer: Expected `reducer` to be a reducer function',
    )

    store.injectedReducers[key] = reducer // eslint-disable-line no-param-reassign
    store.replaceReducer(createReducer(store.injectedReducers))
  }
}

export default function getInjectors(store) {
  checkStore(store)

  return {
    injectReducer: injectReducerFactory(store, true),
  }
}
