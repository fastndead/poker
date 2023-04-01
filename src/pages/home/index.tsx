import { useSpring, animated } from '@react-spring/web'
import Button from 'components/Button'
import Modal from 'components/Modal'
import TextInput from 'components/TextInput'
import React, { useState } from 'react'
import CardsSpread, { springConfigRigid } from './features/CardsSpread'
import JoinRoomModal from './features/JoinRoomModal'

export function Home() {
  const [modalVisible, setModalVisible] = useState(false)
  const [validationError, setValidationError] = useState<string | null>(null)

  const spring = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: {
      ...springConfigRigid
    }
  })

  return (
    <>
      <animated.div
        className='container mx-auto w-screen min-h-screen'
        style={{
          ...spring
        }}
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
      </animated.div>
    </>

  )
}
