// import R from 'ramda'
// import { createSelector } from 'reselect'
import { combineReducers } from 'redux'
import { createDataSelectors } from '../../utils/asyncFactory'
import { createFlowReducer } from '../../utils/flowFactory'
import { initialFlowActions } from './flows'
import { USERS_REDUCER, fetchUsersReducer } from './data/reducer'

export const ROOT_KEY = 'crowdsourcedMapPage'
const INITIAL_DATA_FLOW_REDUCER = 'initialDataFlow'
export default combineReducers({
  [USERS_REDUCER]: fetchUsersReducer,
  [INITIAL_DATA_FLOW_REDUCER]: createFlowReducer(initialFlowActions),
})

const { dataSelector } = createDataSelectors(ROOT_KEY, USERS_REDUCER)
