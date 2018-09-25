import { call, put } from 'redux-saga/effects'
import R from 'ramda'
import { createAction, handleActions } from 'redux-actions'

// ================ ACTIONS FACTORY ============
export const createDataActions = (namespace) => {
  const REQUEST = `${namespace} DATA: REQUEST`
  const SUCCESS = `${namespace} DATA: SUCCESS`
  const FAIL = `${namespace} DATA: FAIL`
  const CLEAR = `${namespace} DATA: CLEAR`

  return ({
    REQUEST,
    SUCCESS,
    FAIL,
    CLEAR,

    request: createAction(REQUEST),
    success: createAction(SUCCESS),
    fail: createAction(FAIL),
    clear: createAction(CLEAR),
  })
}
// =============================================


// ================ REDUCER FACTORY ============
const initState = ({ loading: false, data: null, error: null })

const requestReducer = (state => ({
  data: state.data,
  loading: true,
  error: null,
}))
const successReducer = (state, action) => ({
  error: null,
  loading: false,
  data: action.payload,
})
const failReducer = (state, action) => ({
  loading: false,
  data: null,
  error: action.payload,
})

// TODO: this reducer for singleton collection, we may need one more
// reducer for usuall collections with CRUD
export const createDataReducer = dataActions => handleActions({
  [dataActions.REQUEST]: requestReducer,
  [dataActions.SUCCESS]: successReducer,
  [dataActions.FAIL]: failReducer,
  [dataActions.CLEAR]: R.always(initState),
}, initState)
// =============================================

// ================ SELECTORS FACTORY ============
export const createDataSelectors = (pathArray) => {
  const wrappedPath = R.unless(Array.isArray, R.of)(pathArray)
  return ({
    dataSelector: R.path([...wrappedPath, 'data']),
    loadingSelector: R.path([...wrappedPath, 'loading']),
    errorSelector: R.path([...wrappedPath, 'error']),
  })
}

// ===============================================


// ================ SAGA FACTORY =================
export function* fetchWithActions({
  request,
  dataActions,
}) {
  try {
    yield put(dataActions.request())
    const res = yield call(request)
    yield put(dataActions.success(res))
    return res
  } catch (error) {
    console.warn('fetchWithActions error ', error)
    yield put(dataActions.fail(error))
    throw error
  }
}
