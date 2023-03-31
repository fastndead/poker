import React, { useCallback, useState } from 'react'
import { animated, useSprings } from '@react-spring/web'
import { Player } from 'pages/room/types'

type Props = {
  cards: string[]
  onChange(value: Player['value']): void
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
  step
} : {
    maxValue: number,
    isCenter:boolean,
    index: number,
    length: number,
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
    : isOdd ? index - lengthOfHalf - 1 : index - lengthOfHalf

  const actualStep = step || maxValue / lengthOfHalf

  const absoluteResult = isAccelerated ? absoluteIndex * actualStep + ((absoluteIndex - 1) * 10) : absoluteIndex * actualStep

  if (isSymmetrical) {
    return isLeftSide ? -absoluteResult : absoluteResult
  }

  return absoluteResult
}

function getCardConfigFactory(selectedIndex: number | number[], cardsAmount: number, cardSize: {width: number, height: number}){
  return (index: number) =>  {
    const isSelected = Array.isArray(selectedIndex) ? selectedIndex.includes(index) : selectedIndex === index
    const realIndex = index + 1
    const length = cardsAmount
    const isOdd = length % 2 !== 0
    const isCenter = isOdd && Math.ceil(length / 2) === realIndex

    const widthForOneCard = cardSize.width - ((cardSize.width / 100) * 30)
    const maxWidth = (cardsAmount * widthForOneCard / 2) < MAX_X_VALUE ? (cardsAmount * widthForOneCard / 2) : MAX_X_VALUE

    const rotateValue = getValue({ maxValue: MAX_ROTATE_VALUE, isCenter, index: realIndex, length, isSymmetrical: true, step: 5 })
    const xValue =  getValue({ maxValue: maxWidth, isCenter, index: realIndex, length, isSymmetrical: true })
    const yValue = getValue({ maxValue: MAX_Y_VALUE, isCenter, index: realIndex, length, isSymmetrical: false, isAccelerated: true, step: 3 })

    if (isSelected){
      const coef = 30

      return {
        y: yValue - (coef * Math.cos(rotateValue * (Math.PI / 180))),
        x: xValue + (coef * Math.cos((90 - rotateValue) * (Math.PI / 180))),
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

export default function PlayingCardsInput({ onChange, cards }: Props) {
  const matchMedia = window.matchMedia('(max-width: 1300px)')
  const cardSize = {
    width: matchMedia.matches ? 66 : 100,
    height: matchMedia.matches ? 106 : 160,
  }
  const [chosenCardIndex, setChosenCardIndex] = useState<number>(-1)

  const [springs, api] = useSprings(
    cards.length,
    getCardConfigFactory(chosenCardIndex, cards.length, cardSize),
    [chosenCardIndex]
  )


  const handleHover = useCallback((index: number) => () => {
    api.start(getCardConfigFactory([index, chosenCardIndex], cards.length, cardSize))
  }, [api, cards, cardSize])

  const handleHoverEnd = useCallback(() => () => {
    api.start(getCardConfigFactory(chosenCardIndex, cards.length, cardSize))
  }, [api, cards, cardSize, chosenCardIndex])

  const handleClick = useCallback((index: number) => () => {
    onChange(cards[index])
    setChosenCardIndex(index)
  }, [api, cards, cardSize])


  return (
    <div
      className='relative bottom-0'
      style={{
        width: '50%',
        height: '23%'
      }}
    >
      <div
        className='absolute inset-x-2/4 w-28 -translate-x-1/2 md:top-8'
      >
        {springs.map((springProps, index) => {
          const card = cards[index]
          return (
            <animated.div
              onMouseEnter={handleHover(index)}
              onMouseLeave={handleHoverEnd()}
              onClick={handleClick(index)}
              key={index}
              className={'absolute border cursor-pointer bg-white border-primary-emphasis rounded-lg shadow-card z-1'}
              style={{
                ...cardSize,
                ...springProps
              }}
            >
              <div
                className='absolute inset-2/4 w-6 h-6 flex items-center justify-center font-normal -translate-x-1/2 -translate-y-1/2 text-2xl'
              >
                {card}
              </div>
            </animated.div>
          )
        })}
      </div>
    </div>
  )
}
