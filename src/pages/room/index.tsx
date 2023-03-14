import React, {  useState, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { socket } from 'sockets/socket'

socket.on('yell', (message, room) => {
  console.log('new message: ', message)
  console.log('in the room: ', room)
})

export function Room() {
  const { roomId } = useParams<{roomId:string}>()

  const [name, setName] = useState('')
  const [room, setRoom] = useState('')
  const handleChange = useCallback(
    (setCallback: (arg: string) => void) => (e: React.ChangeEvent<HTMLInputElement>) =>  {
      setCallback(e.target.value)
    },
    [],
  )

  const handleJoin = useCallback(
    () => {
      socket.emit('yell', room)
    },
    [name],
  )

  const handleMyNameIs= useCallback(
    () => {
      socket.emit('mynameis', name)
    },
    [name],
  )

  return (
    <div>
      <div>
        <input
          placeholder='enter the name'
          value={name}
          onChange={handleChange(setName)}
        />
        <button
          onClick={handleMyNameIs}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
        Introduce yourself
        </button>
      </div>
      <div>
        <input
          placeholder='enter the room'
          value={room}
          onChange={handleChange(setRoom)}
        />
        <button
          onClick={handleJoin}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
         Join the room
        </button>
      </div>
      You are in the {roomId} room
      <div
        className="flex space-x-12 "
      >

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          1
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          2
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          3
        </button>
      </div>
    </div>
  )

}
