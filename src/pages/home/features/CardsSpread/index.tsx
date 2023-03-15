import React from 'react'
import { animated, useSpring } from '@react-spring/web'

const springConfig = {
  mass: 10,
  tension: 200,
  friction: 20
}

const cardsSize = {
  height: '166px',
  width: '103px',
}

const yOffset = 10
const yOffsetHalfway = 2
const xOffset = 65
const xOffsetHalfway = 45
const rotate = 20
const rotateHalfway = 10

function getCardsSpreadSpringConfig(toX: number, toY: number, rotate: number) {
  return {
    from: {
      x: 0,
      y: 0,
      rotate: 0
    },
    to: {
      x: toX,
      y: toY,
      rotate: rotate
    },
    config: springConfig,
  }
}

export default function CardsSpread() {
  const springsToLeft = useSpring(getCardsSpreadSpringConfig(xOffset, yOffset, rotate))
  const springsToRight = useSpring(getCardsSpreadSpringConfig(-xOffset, yOffset, -rotate))
  const springsToRightHalfway = useSpring(getCardsSpreadSpringConfig(-xOffsetHalfway, yOffsetHalfway, -rotateHalfway))
  const springsToLeftHalfway = useSpring(getCardsSpreadSpringConfig(xOffsetHalfway, yOffsetHalfway, rotateHalfway))

  return (
    <div
      className='relative h-48 mt-32 md:mt-72'
    >
      <div
        className='absolute inset-x-2/4 w-28 translate-x-negative-1/2'
      >
        <animated.div
          className='absolute border border-primary-emphasis rounded-lg bg-secondary-emphasis'
          style={{
            ...cardsSize,
            zIndex: 2,
            ...springsToRightHalfway
          }}
        />
        <animated.div
          className='absolute border border-primary-emphasis rounded-lg bg-secondary-emphasis'
          style={{
            ...cardsSize,
            zIndex: 2,
            ...springsToLeftHalfway
          }}
        />
        <animated.div
          className='absolute border border-primary-emphasis rounded-lg bg-secondary-emphasis'
          style={{
            ...cardsSize,
            zIndex: 1,
            ...springsToLeft
          }}
        />
        <animated.div
          className='absolute border border-primary-emphasis rounded-lg bg-secondary-emphasis'
          style={{
            ...cardsSize,
            zIndex: 1,
            ...springsToRight
          }}
        />
        <animated.div
          className='absolute border border-primary-emphasis rounded-lg bg-secondary-emphasis'
          style={{
            ...cardsSize,
            zIndex: 3
          }}
        />

      </div>
    </div>
  )}
