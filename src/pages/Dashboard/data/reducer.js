import { createDataReducer } from '../../../utils/asyncFactory'
import { fetchUsersActions } from './actions'

export const USERS_REDUCER = 'users'
export const fetchUsersReducer = createDataReducer(fetchUsersActions)
