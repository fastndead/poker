import { animated, useSpring, useSprings } from '@react-spring/web'
import Button from 'components/Button'
import React, { CSSProperties, useEffect, useMemo, useRef } from 'react'
import type { Player } from '../../types'
import Card from './components/Card'
import { useUserCardSpring } from './hooks/useUserCardSprings'
import { getCardStyle, getPlayerStyle, recalculateFromStateForPlayer } from './utils'

type Props = {
  players: Player[]
  userValue: Player['value']
  isRevealed: boolean
  onShowAll(): void
}

export default function PlayingDesk({ players, userValue, onShowAll, isRevealed }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    recalculateFromStateForPlayer(players)
  }, [players])

  const userCardSpring = useUserCardSpring({
    userCard: userValue,
    containerHeight: ref.current?.offsetHeight,
    containerWidth: ref.current?.offsetWidth,
    isRevealed
  })

  const [cardsSprings, cardSpringApi] = useSprings(
    players.length,
    (index: number) => getCardStyle({
      containerHeight: ref.current?.offsetHeight,
      containerWidth: ref.current?.offsetWidth,
      index,
      players,
      isRevealed
    }),
    [players.length, players, isRevealed]
  )

  const [playersSprings] = useSprings(
    players.length,
    (index: number) => getPlayerStyle({
      containerHeight: ref.current?.offsetHeight,
      containerWidth: ref.current?.offsetWidth,
      index,
      players,
    }),
    [cardSpringApi, ref.current, players.length]
  )

  const canShowAll = useMemo(() => Boolean(userValue && players.length && !players.find((player) => !player.value)) ,[players, userValue])
  const [showResultsButtonSprings ] = useSpring(() => {
    if (canShowAll){
      return {
        from: {
          opacity: 0,
          y: 10
        },
        to: {
          opacity: 1,
          y: 0
        }
      }
    } 
    return {
      from: {
        opacity: 0
      }
    }
  }, [canShowAll])

  return (
    <div
      className='h-full w-full flex relative justify-center items-center'
    >
      <div
        ref={ref}
        className='-mb-20 bg-light-grey rounded-3xl flex items-center justify-center'
        style={{
          width: 366,
          height: 199,
        }}
      >
        {
          <animated.div
            style={{
              ...showResultsButtonSprings
            }}
          >
            <Button 
              htmlType='button' 
              type='primary'  
              className='w-72'
              onClick={onShowAll}
              label='Show results'
            />
          </animated.div>
        }
      </div>
      {players.map(({ id, name, value }, index) => {
        return (
          <React.Fragment
            key={id}
          >
            <Card
              value={value}
              isRevealed={isRevealed}
              animationProp={{
                ...cardsSprings[index]
              }}
            />
            <animated.div
              className='absolute rounded-full w-36 bg-light-grey py-4 flex items-center justify-center'
              style={{
                ...playersSprings[index]
              }}
            >
              <span >
                {name}
              </span>
            </animated.div>
          </React.Fragment>
        )
      })}

      <Card
        value={userValue || ''}
        isRevealed={isRevealed}
        animationProp={{
          ...userCardSpring as unknown as CSSProperties
        }}
      />
    </div>
  )
}
