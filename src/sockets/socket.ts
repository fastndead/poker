import io from 'socket.io-client'
import { apiBaseUrl } from 'constants/constants'

export const socket = io(`${apiBaseUrl}/`, {
  withCredentials: true,
})
