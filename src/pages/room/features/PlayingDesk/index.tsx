import { useSprings } from '@react-spring/web'
import React, { HTMLAttributes } from 'react'
import Card from './components/Card'
import PlayerName from './components/PlayerName'
import { getCardStyle, getPlayerStyle } from './utils'

type Player = {
  isRevealed: boolean,
  value?: string,
  name: string,
}

type Props = {
  players: Player[]
}

export default function PlayingDesk({ players }: Props) {
  return (
    <div
      className='h-full w-full flex relative justify-center items-center'
    >
      <div
        className='-mb-20 bg-light-grey rounded-3xl'
        style={{
          width: 366,
          height: 199,
        }}
      >

      </div>
      {players.map(({ name, value, isRevealed }, index) => {
        return (
          <>
            <Card
              style={{
                height: 80,
                width: 50,
                ...getCardStyle({ amountOfPlayers: players.length, index })
              }}
              value={value}
              isRevealed={isRevealed}
            />
            <PlayerName
              name={name}
              style={{
                ...getPlayerStyle({ amountOfPlayers: players.length, index })
              }}
            />
          </>
        )
      })}

    </div>
  )
}
