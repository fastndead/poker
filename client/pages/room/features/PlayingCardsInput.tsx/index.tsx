import React, { useCallback, useMemo, useState } from 'react'
import cn from 'classnames'
import { animated, useSprings } from '@react-spring/web'
import { Player } from 'pages/room/types'
import { useWindowSize } from 'hooks/useWindowSize'
import styles from './PlayingCardsInput.module.css'

type Props = {
  cards: string[]
  userValue: string | null
  onChange(value: Player['value']): void
  name?: string
}

// todo i really wish i would refactor this shit, but for now it works
const MAX_Y_VALUE = 1
const MAX_ROTATE_VALUE = 30
const MAX_X_VALUE = 230
function getValue({
  maxValue,
  isCenter,
  index,
  length,
  isSymmetrical,
  isAccelerated,
  step,
}: {
  maxValue: number
  isCenter: boolean
  index: number
  length: number
  isSymmetrical: boolean
  isAccelerated?: boolean
  step?: number
}) {
  if (isCenter) {
    return 0
  }

  const isLeftSide = length / 2 > index
  const lengthOfHalf = Math.floor(length / 2)
  const isOdd = length % 2 !== 0
  const absoluteIndex = isLeftSide
    ? lengthOfHalf - index + 1
    : isOdd
      ? index - lengthOfHalf - 1
      : index - lengthOfHalf

  const actualStep = step || maxValue / lengthOfHalf

  const absoluteResult = isAccelerated
    ? absoluteIndex * actualStep + (absoluteIndex - 1) * 10
    : absoluteIndex * actualStep

  if (isSymmetrical) {
    return isLeftSide ? -absoluteResult : absoluteResult
  }

  return absoluteResult
}

function getCardConfigFactory(
  selectedIndex: number | number[],
  cardsAmount: number,
  cardSize: { width: number; height: number }
) {
  return (index: number) => {
    const isSelected = Array.isArray(selectedIndex)
      ? selectedIndex.includes(index)
      : selectedIndex === index
    const realIndex = index + 1
    const length = cardsAmount
    const isOdd = length % 2 !== 0
    const isCenter = isOdd && Math.ceil(length / 2) === realIndex

    const widthForOneCard = cardSize.width - (cardSize.width / 100) * 30
    const maxWidth =
      (cardsAmount * widthForOneCard) / 2 < MAX_X_VALUE
        ? (cardsAmount * widthForOneCard) / 2
        : MAX_X_VALUE

    const rotateValue = getValue({
      maxValue: MAX_ROTATE_VALUE,
      isCenter,
      index: realIndex,
      length,
      isSymmetrical: true,
      step: 5,
    })
    const xValue = getValue({
      maxValue: maxWidth,
      isCenter,
      index: realIndex,
      length,
      isSymmetrical: true,
    })
    const yValue = getValue({
      maxValue: MAX_Y_VALUE,
      isCenter,
      index: realIndex,
      length,
      isSymmetrical: false,
      isAccelerated: true,
      step: 3,
    })

    if (isSelected) {
      const coef = 30

      return {
        y: yValue - coef * Math.cos(rotateValue * (Math.PI / 180)),
        x: xValue + coef * Math.cos((90 - rotateValue) * (Math.PI / 180)),
        rotate: rotateValue,
        zIndex: index,
      }
    }

    return {
      y: yValue,
      x: xValue,
      rotate: rotateValue,
      zIndex: index,
    }
  }
}

export default function PlayingCardsInput({ onChange, cards, userValue, name }: Props) {
  const [width] = useWindowSize()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const matchMedia = useMemo(() => window.matchMedia('(max-width: 1300px)'), [width])
  const cardSize = useMemo(
    () => ({
      width: matchMedia.matches ? 66 : 100,
      height: matchMedia.matches ? 106 : 160,
    }),
    [matchMedia]
  )
  const chosenCardIndex = useMemo(() => {
    if (userValue) {
      return cards.findIndex((value) => value === userValue)
    }
    return -1
  }, [cards, userValue])

  const [springs, api] = useSprings(
    cards.length,
    getCardConfigFactory(chosenCardIndex, cards.length, cardSize),
    [chosenCardIndex]
  )

  const handleHover = useCallback(
    (index: number) => () => {
      api.start(getCardConfigFactory([index, chosenCardIndex], cards.length, cardSize))
    },
    [api, chosenCardIndex, cards.length, cardSize]
  )

  const handleHoverEnd = useCallback(
    () => () => {
      api.start(getCardConfigFactory(chosenCardIndex, cards.length, cardSize))
    },
    [api, cards, cardSize, chosenCardIndex]
  )

  const handleClick = useCallback(
    (index: number) => () => {
      if (cards[index] === userValue) {
        onChange(null)
        return
      }
      onChange(cards[index])
    },
    [cards, userValue, onChange]
  )

  return (
    <>
      {name && (
        <div className='rounded-tl-xl rounded-tr-xl border border-b-0 border-solid border-black bg-light-grey px-5 py-2 text-black'>
          {name}
        </div>
      )}
      <div
        className='relative bottom-0'
        style={{
          width: '50%',
          height: '23%',
        }}
      >
        <div
          className={
            'playing-cards-input-background absolute h-full  w-full rounded-lg rounded-tl-full rounded-tr-full border-4 border-solid border-primary-idle bg-light-grey ' +
            styles.background
          }
        />
        <div
          className='absolute inset-x-2/4 -translate-x-1/2 scale-90 md:top-0'
          style={{
            ...cardSize,
          }}
        >
          {springs.map((springProps, index) => {
            const card = cards[index]
            return (
              <animated.div
                onMouseEnter={handleHover(index)}
                onMouseLeave={handleHoverEnd()}
                onClick={handleClick(index)}
                key={index}
                className={
                  'z-1 emphasis-text card-background absolute cursor-pointer rounded-lg border border-primary-emphasis bg-white shadow-card' +
                  styles.card
                }
                style={{
                  ...cardSize,
                  ...springProps,
                }}
              >
                <div className='absolute inset-2/4 flex h-6 w-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center text-2xl font-normal'>
                  {card}
                </div>
              </animated.div>
            )
          })}
        </div>
      </div>
    </>
  )
}
