import { createFlowActions, cofigureFlow } from '../../utils/flowFactory'

import { fetchUsersSaga } from './data/sagas'


const FETCH_INITIAL_DATA = 'app/CrowdsourcedMapPage/FETCH_INITIAL_DATA'
export const initialFlowActions = createFlowActions(FETCH_INITIAL_DATA)
function* fetchInitialDataFlow() {
  yield fetchUsersSaga()
  // navigate, make another requests, save smth to storage, perform any additional things
  // needed during this flow
}

export const SAGA_KEY = 'CrowdsourcedMapPage'
export default function* allFlows() {
  // ============ LIST OF FLOWS AVAILABLE FOR THIS PAGE ===========
  yield cofigureFlow({
    flowActions: initialFlowActions,
    trySaga: fetchInitialDataFlow,
  })

}
