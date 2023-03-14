import io from 'socket.io-client'

const isDev = process.env.NODE_ENV !== 'production'
const socketUrl = isDev ? 'http://localhost:8080' : '/'

export const socket = io(socketUrl, {
  withCredentials: true, 
})
