import React, { useCallback, useRef } from 'react'
import { ReactComponent as CardsMount } from 'assets/cardsMount.svg'
import { animated, useSprings } from '@react-spring/web'

type Props = {
  cards: string[]
}

const MAX_Y_VALUE = 50
const MAX_ROTATE_VALUE = 13
const MAX_X_VALUE = 250
function getValue(maxValue: number, isCenter:boolean, index: number, length: number, isSymmetrical: boolean):number {
  if(isCenter) {
    return 0
  }

  const isLeftSide = length / 2 > index
  const lengthOfHalf = Math.floor(length /2)
  const isOdd = length % 2 !== 0
  const absoluteIndex = isLeftSide
    ? lengthOfHalf - index + 1
    : isOdd ? index - lengthOfHalf - 1 : index - lengthOfHalf

  const yStep = maxValue / lengthOfHalf

  const absoluteResult = absoluteIndex * yStep
  if(isSymmetrical) {
    return isLeftSide ? -absoluteResult : absoluteResult
  }
  return absoluteResult
}

function getCardConfigFactory(selectedIndex: number, cardsAmount: number){
  return (index: number) =>  {
    const isSelected = selectedIndex === index
    const realIndex = index + 1
    const length = cardsAmount
    const isOdd = length % 2 !== 0
    const isCenter = isOdd && Math.ceil(length/2) === realIndex
    const rotateValue = getValue(MAX_ROTATE_VALUE, isCenter, realIndex, length, true)
    const xValue =  getValue(MAX_X_VALUE, isCenter, realIndex, length, true)
    const yValue = getValue(MAX_Y_VALUE,isCenter, realIndex, length, false)

    return {
      y: isSelected ? yValue - 30 : yValue,
      x: xValue,
      rotate: rotateValue,
      zIndex: index,
    }
  }
}


export default function PlayingCardsInput({ cards }:Props) {
  const [springs, api] = useSprings(
    cards.length,
    getCardConfigFactory(-1, cards.length),
  )

  const handleHover = useCallback((index: number) => () => {
    api.start(getCardConfigFactory(index, cards.length))
  }, [api])

  const handleHoverEnd = useCallback(() => () => {
    api.start(getCardConfigFactory(-1, cards.length))
  }, [])

  return(
    <div
      className='absolute bottom-0 w-6/12'
    >
      <div
        className='absolute inset-x-2/4 w-28 -translate-x-1/2 -top-2'
      >
        {springs.map((springProps, index) => {
          const card = cards[index]
          return (
            <animated.div
              onMouseEnter={handleHover(index)}
              onMouseLeave={handleHoverEnd()}
              key={index}
              className={'absolute border cursor-pointer bg-white border-primary-emphasis rounded-lg shadow-card' + ' ' + index}
              style={{
                width: '100px',
                height: '160px',
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
      <CardsMount
        width='100%'
        className='-mb-10'
      />
    </div>
  )
}
