import React, { useEffect } from 'react'
import {useParams} from 'react-router-dom'
import {socket} from 'sockets/socket'

export function Room() {
  const { roomId } = useParams<{roomId:string}>()
  useEffect(() => {
    socket.on('connection', socket => socket.join(roomId))
  },[])

  return (
    <div>
      You are in the {roomId} room
      <button>1</button>
      <button>2</button>
      <button>3</button>
    </div>
  )

}
