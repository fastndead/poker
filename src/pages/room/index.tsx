import Sidebar from '../../components/Sidebar'
import React, { useState } from 'react'
import { DEFAULT_CARD_SYSTEM } from './constants'
import PlayingCardsInput from './features/PlayingCardsInput.tsx'
import PlayingDesk from './features/PlayingDesk'
import Button from '../../components/Button'

const testPlayers = [
  {
    id: 1,
    name: 'Асман',
    isRevealed: false,
  },
]


export function Room() {
  const [players, setPlayers] = useState(testPlayers)

  return (
    <div
      className='width-screen flex flex-row overflow-hidden'
    >
      <div
        className='fixed z-50 bottom-0'
      >
        <Button
          type='secondary'
          label='Add player'
          onClick={() => setPlayers((prev) => {
            const id = prev[prev.length - 1] ? prev[prev.length - 1]?.id + 1 : 0
            return prev.length < 7 ? [...prev, {
              id,
              name: id % 2 === 0 ? 'Настёна' : 'Ксюша',
              isRevealed: false,
            }] : prev})}
        />
        <Button
          type='secondary'
          label='remove player'
          className='mt-2'
          onClick={() => setPlayers((prev) => prev.slice(0, -1))}
        />
        <Button
          type='secondary'
          label='remove the first'
          className='mt-2'
          onClick={() => setPlayers((prev) => prev.slice(1, prev.length))}
        />

      </div>
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
