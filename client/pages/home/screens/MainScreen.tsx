import React, { SyntheticEvent, useState } from 'react'
import LogoSvg from 'assets/logo.svg'
import CardsSpread from '../features/CardsSpread'
import InputAnimated from '../features/InputAnimated'
import Button from 'components/Button'
import { useHandleSubmit } from '../hooks/useHandleSubmit'
import JoinRoomModal from '../features/JoinRoomModal'
import CardWhite from '../components/CardWhite'
import CardsDecorations from '../components/CardsDecorations'

export default function MainScreen() {
  const [modalVisible, setModalVisible] = useState(false)
  const [validationError, setValidationError] = useState<string | null>(null)
  const [name, setName] = useState('')

  const handleSubmit = useHandleSubmit({ name, setValidationError })

  return (
    <div className='base-background relative overflow-hidden px-16 py-12'>
      <CardsDecorations />
      <h1 className='relative z-50 flex items-center font-barriecito text-3xl text-primary-emphasis'>
        <LogoSvg />
        Planning poker
      </h1>
      <div className='z-50 m-auto -mt-16 flex min-h-screen w-80 flex-col items-center justify-center'>
        <CardsSpread />
        <form onSubmit={handleSubmit}>
          <InputAnimated
            validationError={validationError}
            value={name}
            onChange={(e: SyntheticEvent<HTMLInputElement>) => setName(e.currentTarget.value)}
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
  )
}
