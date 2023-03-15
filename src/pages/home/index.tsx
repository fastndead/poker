import Button from 'components/Button'
import TextInput from 'components/TextInput'
import React from 'react'
import CardsSpread from './features/CardsSpread'

export function Home() {
  return (
    <>
      <div
        className="container mx-auto min-h-screen"
      >
        <div
          className='w-80 m-auto  min-h-full'
        >
          <CardsSpread />
          <TextInput
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
          />
        </div>
      </div>
    </>

  )
}
