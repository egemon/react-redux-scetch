import { fetchWithActions } from '../../../utils/asyncFactory'

import { fetchUsersActions } from './actions'
import { fetchUsersRequest } from './requests'

export const fetchUsersSaga = function* fetchUsersSaga() {
  yield fetchWithActions({
    // there are two ways to pass params to request:
    // 1) as here - using factory, that remember params and returns request function to call
    // 2) pass params as third key in object argument.
    // I like first approach because all info regarding this request handled here
    // u can pass as much args as u want in a way u want here,
    // and they all will be available for request function
    // with second approach u can pass only one argument
    request: fetchUsersRequest(),
    dataActions: fetchUsersActions,
  })
}
