import R from 'ramda'
import invariant from 'invariant'

/**
 * Validate the shape of redux store
 */
export default function checkStore(store) {
  const isStoreOk = R.is(Function, store.dispatch)
    && R.is(Function, store.subscribe)
    && R.is(Function, store.getState)
    && R.is(Function, store.replaceReducer)
    && R.is(Function, store.runSaga)
    && R.is(Object, store.injectedReducers)
    && R.is(Object, store.injectedSagas)

  invariant(
    isStoreOk,
    '(app/utils...) injectors: Expected a valid redux store',
  )
}
