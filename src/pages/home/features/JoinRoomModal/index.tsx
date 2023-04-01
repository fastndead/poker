import Button from 'components/Button'
import Modal from 'components/Modal'
import TextInput from 'components/TextInput'
import React, { ReactEventHandler, useCallback, useEffect, useState } from 'react'
import { socket } from 'sockets/socket'
import { useNavigate } from 'react-router-dom'

type Props = {
  isVisible: boolean 
  onClose(): void
}

export default function JoinRoomModal({ isVisible, onClose }: Props) {
  const navigate = useNavigate()
  const [roomId, setRoomId] = useState('')
  const handleChange = useCallback<ReactEventHandler<HTMLInputElement>>((e)=> {
    setRoomId(e.currentTarget.value)
  }, [setRoomId])
  const [validationError, setValidationError] = useState<string | null>(null)

  const handleSubmit = useCallback<ReactEventHandler<HTMLFormElement>>((e) => {
    e.preventDefault()

    if (!roomId)  {
      setValidationError('Room ID cannot be empty')
      return
    }
    socket.emit('does_room_exist', { roomId })
  }, [roomId])

  const redirectToRoom = useCallback(({ doesRoomExist }: {doesRoomExist: boolean}) => {
    if (doesRoomExist) {
      console.log(roomId)
      navigate(`/room/${roomId}`)
    } else {
      setValidationError('The room with given ID does not exist')
    }
  }, [roomId])

  useEffect(() => {
    socket.on('does_room_exist', redirectToRoom)

    return () => {
      socket.off('does_room_exist')
    }
  }, [redirectToRoom])

  const handleClose = useCallback(() => {
    setRoomId('')
    onClose()
  }, [onClose, setRoomId])

  return (
    <Modal
      onClose={handleClose}
      isVisible={isVisible}
      title='Enter the room ID'
      className=''
    >
      <form
        className='pt-6 space-y-6'
        onSubmit={handleSubmit}
      >
        <TextInput 
          value={roomId}
          onChange={handleChange}
          placeholder='Room ID'
          validationError={validationError}
        />
        <Button 
          htmlType='submit'
          type='primary'
          label='Join the room'
        />
      </form>
    </Modal>
  )
}
