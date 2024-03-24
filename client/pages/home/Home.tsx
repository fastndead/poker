import Button from 'components/Button'
import LogoSvg from 'assets/logo.svg'
import React, { useState } from 'react'
import CardsSpread from './features/CardsSpread'
import JoinRoomModal from './features/JoinRoomModal'
import InputAnimated from './features/InputAnimated'
import { useHandleSubmit } from './hooks/useHandleSubmit'

export function Home() {
  const [modalVisible, setModalVisible] = useState(false)
  const [validationError, setValidationError] = useState<string | null>(null)
  const [name, setName] = useState('')

  const handleSubmit = useHandleSubmit({ name, setValidationError })

  return (
    <>
      <div className='base-background mx-auto h-screen w-screen bg-bottom'>
        <div>
          <h1 className='flex items-center pl-16 pt-12 font-barriecito text-3xl text-primary-emphasis'>
            <LogoSvg /> Planning poker
          </h1>
          <div className='m-auto flex min-h-screen w-80 flex-col items-center justify-center'>
            <CardsSpread />
            <form onSubmit={handleSubmit}>
              <InputAnimated
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
