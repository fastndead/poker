import Sidebar from '../../components/Sidebar'
import React, { useState } from 'react'
import { DEFAULT_CARD_SYSTEM } from './constants'
import PlayingCardsInput from './features/PlayingCardsInput.tsx'
import PlayingDesk from './features/PlayingDesk'
import Button from '../../components/Button'

const testPlayers = [
  {
    name: 'Asman',
    isRevealed: false,
  },
]


export function Room() {
  const [players, setPlayers] = useState(testPlayers)


  return (
    <div
      className='width-screen flex flex-row overflow-hidden'
    >
      <Button
        type='secondary'
        label='Add player'
        onClick={() => setPlayers((prev) => [...prev, {
          name: 'Ksenia',
          isRevealed: false,
        }])}
        className='fixed w-10 '
      />
      <Sidebar />
      <div
        className='container h-screen flex flex-col items-center justify-between relative w-full m-auto'
      >
        <PlayingDesk
          players={players}
        />
        <PlayingCardsInput
          cards={DEFAULT_CARD_SYSTEM}
        />
      </div>
    </div>
  )

}
