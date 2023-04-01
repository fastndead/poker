import Button from 'components/Button'
import Modal from 'components/Modal'
import TextInput from 'components/TextInput'
import React, { useState } from 'react'
import CardsSpread from './features/CardsSpread'
import JoinRoomModal from './features/JoinRoomModal'

export function Home() {
  const [modalVisible, setModalVisible] = useState(false)
  const [validationError, setValidationError] = useState<string | null>(null)
  return (
    <>
      <div
        className='container mx-auto w-screen min-h-screen'
      >
        <div
          className='w-80 m-auto min-h-full'
        >
          <CardsSpread />
          <TextInput
            validationError={validationError}
            className='mt-6'
            placeholder='User name'
          />
          <Button
            className='mt-2.5'
            label='Start a new game'
            type='primary'
          />
          <Button
            className='mt-2.5'
            label='Join the room'
            type='secondary'
            onClick={() => setModalVisible(true)}
          />
        </div>
        <JoinRoomModal
          isVisible={modalVisible}
          onClose={() => setModalVisible(false)}
        />
      </div>
    </>

  )
}
