import { useSpring, animated } from '@react-spring/web'
import Button from 'components/Button'
import TextInput from 'components/TextInput'
import { useLocalStorage } from 'hooks/useLocalStorage'
import React, { useCallback, useState, ReactEventHandler } from 'react'
import { useNavigate } from 'react-router-dom'
import CardsSpread, { springConfigRigid } from './features/CardsSpread'
import { useNotifications } from 'hooks/useNotifications'
import JoinRoomModal from './features/JoinRoomModal'
import { apiBaseUrl } from '../../constants'

export function Home() {
  const [modalVisible, setModalVisible] = useState(false)
  const [validationError, setValidationError] = useState<string | null>(null)
  const [, setNameLocalStorage] = useLocalStorage('userName', '')
  const [name, setName] = useState('')
  const navigate = useNavigate()
  const { addNotification } = useNotifications()

  const handleSubmit = useCallback<ReactEventHandler<HTMLFormElement>>(async (e) => {
    e.preventDefault()
    debugger
    if (!name) {
      setValidationError('Name cannot be empty')
      return
    }

    if (name.length > 13) {
      setValidationError('Name cannot be longer than 13 characters')
      return
    }
    try {
      console.log(apiBaseUrl)

      const response = await fetch(`${apiBaseUrl}/mynameis`, {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }), // body data type must match "Content-Type" header
      })

      if (!response.ok) {
        throw new Error('Server error')
      }

      const roomId = (Math.random() + 1).toString(36).substring(2).toUpperCase()
      setNameLocalStorage(name)
      navigate(`/room/${roomId}`)
    } catch {
      addNotification({ type: 'error', text: 'Something is wrong on the server, refresh the page or try again later' })
    }
    
  }, [name, navigate, setValidationError, setNameLocalStorage, addNotification])

  return (
    <>
      <div
        className='container mx-auto w-screen h-screen '
      >
        <div
          className='w-80 m-auto min-h-full pt-32 2xl:pt-44'
        >
          <CardsSpread />
          <form
            onSubmit={handleSubmit}
          >
            <TextInput
              validationError={validationError}
              value={name}
              onChange={(e) => setName(e.currentTarget.value)}
              className='mt-6'
              placeholder='User name'
            />
            <Button
              className='mt-2.5'
              label='Start a new game'
              type='primary'
              htmlType='submit'
            />
            <Button
              className='mt-2.5'
              label='Join the room'
              type='secondary'
              onClick={() => setModalVisible(true)}
            />
          </form>
        </div>
        <JoinRoomModal
          isVisible={modalVisible}
          onClose={() => setModalVisible(false)}
        />
      </div>
    </>

  )
}
