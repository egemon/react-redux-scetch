// this action may move to other part of the project, or to data section
// if several pages will need this data. It concerns only data and request for the data
import { createDataActions } from '../../../utils/asyncFactory'

const FETCH_USERS = 'Dashboard/FETCH_USERS'
export const fetchUsersActions = createDataActions(FETCH_USERS)
