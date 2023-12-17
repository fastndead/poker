import Button from 'components/Button'
import TextInput from 'components/TextInput'
import LogoSvg from 'assets/logo.svg'
import { useLocalStorage } from 'hooks/useLocalStorage'
import React, { useCallback, useState, ReactEventHandler } from 'react'
import { useNavigate } from 'react-router-dom'
import CardsSpread from './features/CardsSpread'
import { useNotifications } from 'hooks/useNotifications'
import JoinRoomModal from './features/JoinRoomModal'
import { apiBaseUrl } from 'constants/constants'

export function Home() {
  const [modalVisible, setModalVisible] = useState(false)
  const [validationError, setValidationError] = useState<string | null>(null)
  const [, setNameLocalStorage] = useLocalStorage('userName', '')
  const [name, setName] = useState('')
  const navigate = useNavigate()
  const { addNotification } = useNotifications()

  const handleSubmit = useCallback<ReactEventHandler<HTMLFormElement>>(
    async (e) => {
      e.preventDefault()
      if (!name) {
        setValidationError('Name cannot be empty')
        return
      }

      if (name.length > 13) {
        setValidationError('Name cannot be longer than 13 characters')
        return
      }
      try {
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

        const roomId = (Math.random() + 1).toString(36).substring(2, 6).toUpperCase()
        setNameLocalStorage(name)
        navigate(`/room/${roomId}`)
      } catch {
        addNotification({
          type: 'error',
          text: 'Something is wrong on the server, refresh the page or try again later',
        })
      }
    },
    [name, navigate, setValidationError, setNameLocalStorage, addNotification]
  )

  return (
    <>
      <div className='base-background  mx-auto h-screen w-screen'>
        <div>
          <h1 className='flex items-center pl-16 pt-12 font-barriecito text-3xl text-primary-emphasis'>
            <LogoSvg /> Planning poker
          </h1>
          <div className='m-auto min-h-full w-80 pt-28 2xl:pt-44'>
            <CardsSpread />
            <form onSubmit={handleSubmit}>
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
        </div>
        <JoinRoomModal
          isVisible={modalVisible}
          onClose={() => setModalVisible(false)}
        />
      </div>
    </>
  )
}
