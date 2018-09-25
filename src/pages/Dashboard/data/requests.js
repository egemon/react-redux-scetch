import { api } from '../../../utils/axios'

const USERS_URL = 'https://randomuser.me/api/'

export const fetchUsersRequest = () => () => api.get(USERS_URL, {
  params: {
    nat: 'gb',
    results: 5,
  },
})
