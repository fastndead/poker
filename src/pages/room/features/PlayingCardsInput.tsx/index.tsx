import React from 'react'
import { ReactComponent as CardsMount } from 'assets/cardsMount.svg'
import { animated, useSpring, useSprings } from '@react-spring/web'

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


export default function PlayingCardsInput({ cards }:Props) {
  const [springs, _api] = useSprings(
    cards.length,
    () => ({
      from: { opacity: 0 },
      to: { opacity: 1 },
      config:{
        mass: 10
      }
    }),
    []
  )

  return(
    <div
      className='absolute bottom-0 w-6/12'
    >
      <div
        className='absolute inset-x-2/4 w-28 -translate-x-1/2 -top-2'
      >
        {springs.map((springProps, index) => {
          const card = cards[index]
          const realIndex = index + 1
          const length = cards.length
          const isOdd = length % 2 !== 0
          const isCenter = isOdd && Math.ceil(length/2) === realIndex
          const rotateValue = getValue(MAX_ROTATE_VALUE, isCenter, realIndex, length, true)
          const xValue =  getValue(MAX_X_VALUE, isCenter, realIndex, length, true)
          const yValue = getValue(MAX_Y_VALUE,isCenter, realIndex, length, false)
          return (
            <animated.div
              key={index}
              className={'absolute border bg-white border-primary-emphasis rounded-lg shadow-card' + ' ' + index}
              style={{
                width: '100px',
                height: '160px',
                x: xValue,
                y: yValue,
                rotate: rotateValue,
                zIndex: index,
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
