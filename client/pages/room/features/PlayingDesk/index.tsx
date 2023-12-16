import { animated, useSpring, useSprings } from '@react-spring/web'
import Button from 'components/Button'
import React, { CSSProperties, useEffect, useMemo, useRef } from 'react'
import type { Player } from '../../types'
import Card from './components/Card'
import EmptyRoomBanner from './components/EmptyRoomBanner'
import { useUserCardSpring } from './hooks/useUserCardSprings'
import { getCardStyle, getPlayerStyle, recalculateFromStateForPlayer } from './utils'

type Props = {
  players: Player[]
  userValue: Player['value']
  isRevealed: boolean
  onShowAll(): void
  onReset(): void
}

export default function PlayingDesk({ players, userValue, onShowAll, onReset, isRevealed }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    recalculateFromStateForPlayer(players)
  }, [players])

  const userCardSpring = useUserCardSpring({
    userCard: userValue,
    containerHeight: ref.current?.offsetHeight,
    containerWidth: ref.current?.offsetWidth,
    isRevealed,
  })

  const [cardsSprings, cardSpringApi] = useSprings(
    players.length,
    (index: number) =>
      getCardStyle({
        containerHeight: ref.current?.offsetHeight,
        containerWidth: ref.current?.offsetWidth,
        index,
        players,
        isRevealed,
      }),
    [players.length, players, isRevealed]
  )

  const [playersSprings] = useSprings(
    players.length,
    (index: number) =>
      getPlayerStyle({
        containerHeight: ref.current?.offsetHeight,
        containerWidth: ref.current?.offsetWidth,
        index,
        players,
      }),
    [cardSpringApi, ref.current, players.length]
  )

  const canShowAll = useMemo(
    () => Boolean(userValue && players.length && !players.find((player) => !player.value)),
    [players, userValue]
  )
  const [showResultsButtonSprings] = useSpring(() => {
    if (canShowAll) {
      return {
        from: {
          opacity: 0,
          y: 10,
        },
        to: {
          opacity: 1,
          y: 0,
        },
      }
    }
    return {
      from: {
        opacity: 0,
      },
    }
  }, [canShowAll])

  return (
    <div className='relative flex h-full w-full items-center justify-center'>
      <div
        ref={ref}
        className='-mb-20 flex items-center justify-center rounded-3xl bg-light-grey'
        style={{
          width: 366,
          height: 199,
        }}
      >
        {!players.length && <EmptyRoomBanner />}
        {canShowAll && (
          <animated.div
            style={{
              ...showResultsButtonSprings,
            }}
          >
            <Button
              htmlType='button'
              type='primary'
              className='w-72'
              onClick={isRevealed ? onReset : onShowAll}
              label={isRevealed ? 'Next round' : 'Show results'}
            />
          </animated.div>
        )}
      </div>
      {players.map(({ id, name, value }, index) => {
        return (
          <React.Fragment key={id}>
            <Card
              value={value}
              isRevealed={isRevealed}
              animationProp={{
                ...cardsSprings[index],
              }}
            />
            <animated.div
              className='absolute flex w-36 items-center justify-center rounded-full border border-solid border-black bg-light-grey py-4 text-black'
              style={{
                ...playersSprings[index],
              }}
            >
              <span>{name}</span>
            </animated.div>
          </React.Fragment>
        )
      })}

      {userValue && (
        <Card
          value={userValue || ''}
          isRevealed={isRevealed}
          animationProp={{
            ...(userCardSpring as unknown as CSSProperties),
          }}
        />
      )}
    </div>
  )
}
