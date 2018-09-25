import R from 'ramda'
import { createAction, handleActions } from 'redux-actions'
import { call, takeLatest, put } from 'redux-saga/effects'
import { createSelector } from 'reselect'

// ================ ACTIONS FACTORY ============
export const createFlowActions = (namespace) => {
  const RUN = `${namespace} FLOW: RUN`
  const BEGIN = `${namespace} FLOW: BEGIN`
  const RESOLVE = `${namespace} FLOW: RESOLVE`
  const REJECT = `${namespace} FLOW: REJECT`

  return ({
    RUN,
    BEGIN,
    RESOLVE,
    REJECT,

    run: createAction(RUN),
    begin: createAction(BEGIN),
    resolve: createAction(RESOLVE),
    reject: createAction(REJECT),
  })
}
// =============================================


// ================ REDUCER FACTORY ============
const STATUSES = {
  IDEL: 'IDEL',
  IN_PROGRESS: 'IN_PROGRESS',
  RESOLVED: 'RESOLVED',
  REJECTED: 'REJECTED',
}
const initState = ({ status: STATUSES.IDEL })

const beginReducer = () => ({ status: STATUSES.IN_PROGRESS })

const resolveReducer = () => ({ status: STATUSES.RESOLVED })

const rejectReducer = () => ({ status: STATUSES.REJECTED })

export const createFlowReducer = asyncActions => handleActions({
  [asyncActions.BEGIN]: beginReducer,
  [asyncActions.RESOLVE]: resolveReducer,
  [asyncActions.REJECT]: rejectReducer,
}, initState)
// ===============================================


// ================ SELECTORS FACTORY ============
// TODO: add deep nesting support
export const createFlowSelectors = (reducerName) => {
  const substateSelector = R.propOr({}, reducerName)
  const statusSelector = createSelector(
    [substateSelector],
    state => state.status,
  )
  return ({
    inProgressSelector: createSelector(
      [statusSelector],
      R.equals(STATUSES.IN_PROGRESS),
    ),
    isRejectedSelector: createSelector(
      [statusSelector],
      R.equals(STATUSES.REJECTED),
    ),
    isResolvedSelector: createSelector(
      [statusSelector],
      R.equals(STATUSES.RESOLVED),
    ),
  })
}
// ===============================================


// ================ SAGA FACTORY =================
export const cofigureFlow = function* cofigureFlow({
  flowActions,
  trySaga = R.identity,
  catchSaga = R.identity,
}) {
  const flow = function* flow({ payload }) {
    yield put(flowActions.begin())
    try {
      yield call(trySaga, payload)
      yield put(flowActions.resolve())
    } catch (err) {
      console.warn('Error in flow', err)
      yield call(catchSaga, { flowActions, err, payload })
      yield put(flowActions.reject())
    }
  }

  return yield takeLatest(flowActions.RUN, flow)
}
