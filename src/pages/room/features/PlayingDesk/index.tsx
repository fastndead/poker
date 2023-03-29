import { animated, useSprings, useSpring } from '@react-spring/web'
import React, { CSSProperties, useCallback, useEffect, useRef } from 'react'
import Card from './components/Card'
import { getCardStyle, getPlayerStyle, getUserCardStyle, recalculateFromStateForPlayer } from './utils'

export type Card = {
  isRevealed: boolean,
  value?: string,
}

export type Player = {
  id: number,
  card: Card
  name: string,
}

type Props = {
  players: Player[]
  userCard: Card | null 
}

export default function PlayingDesk({ players, userCard }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    recalculateFromStateForPlayer(players)
  }, [players])

  const [cardsSprings, cardSpringApi] = useSprings(
    players.length,
    (index: number) => getCardStyle({
      containerHeight: ref.current?.offsetHeight,
      containerWidth: ref.current?.offsetWidth,
      index,
      players,
    }),
    [players.length]
  )

  const [userCardSpring, userCardSpringApi] = useSpring(() =>{
    return userCard 
      ? getUserCardStyle({
        containerHeight: ref.current?.offsetHeight,
        containerWidth: ref.current?.offsetWidth,
      }) 
      : {
        to: {
          opacity: 0,
          x: 0,
          y: 0
        }
      } 
  }, [userCard]) 

  const [playersSprings, playersSpringApi] = useSprings(
    players.length,
    (index: number) => getPlayerStyle({
      containerHeight: ref.current?.offsetHeight,
      containerWidth: ref.current?.offsetWidth,
      index,
      players,
    }),
  )

  const refreshAnimation = useCallback(() => {
    cardSpringApi.start(
      (index) => getCardStyle({
        containerHeight: ref.current?.offsetHeight,
        containerWidth: ref.current?.offsetWidth,
        index,
        players,
      }),
    )

    playersSpringApi.start(
      (index) => getPlayerStyle({
        containerHeight: ref.current?.offsetHeight,
        containerWidth: ref.current?.offsetWidth,
        index,
        players,
      }),
    )
  }, [cardSpringApi, playersSpringApi, ref, players.length])

  useEffect(() => {
    refreshAnimation()
  }, [players.length, refreshAnimation])

  // we need to refresh animation when we get the ref's dimansions
  useEffect(() => {
    refreshAnimation()
  }, [ref.current])


  return (
    <div
      className='h-full w-full flex relative justify-center items-center'
    >
      <div
        ref={ref}
        className='-mb-20 bg-light-grey rounded-3xl'
        style={{
          width: 366,
          height: 199,
        }}
      >

      </div>
      {players.map(({ id, name, card }, index) => {
        const { value, isRevealed } = card
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
        value={userCard?.value || ''}
        isRevealed={userCard?.isRevealed}
        animationProp={{
          ...userCardSpring as unknown as CSSProperties
        }}
      />
    </div>
  )
}
