import React, { useCallback, useEffect } from 'react'
import { animated, useSpring } from '@react-spring/web'

const springConfig = {
  mass: 10,
  tension: 200,
  friction: 20
}

const springConfigRigid = {
  mass: 10,
  tension: 60,
  friction: 40
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

const from = {
  x: 0,
  y: 0,
  rotate: 0
}

function getCardsSpreadSpringConfig(toX: number, toY: number, rotate: number) {
  return {
    from,
    to: getToState(toX, toY, rotate),
  }
}

function getToState(toX: number, toY: number, rotate: number) {
  return  {
    x: toX,
    y: toY,
    rotate: rotate,
    config: springConfig,
  }
}

export default function CardsSpread() {
  const [springsToLeft, springsToLeftApi] = useSpring(() => getCardsSpreadSpringConfig(xOffset, yOffset, rotate))
  const [springsToRight, springsToRightApi] = useSpring(() => getCardsSpreadSpringConfig(-xOffset, yOffset, -rotate))
  const [springsToRightHalfway, springsToRightHalfwayApi] = useSpring(() => getCardsSpreadSpringConfig(-xOffsetHalfway, yOffsetHalfway, -rotateHalfway))
  const [springsToLeftHalfway, springsToLeftHalfwayApi] = useSpring(() => getCardsSpreadSpringConfig(xOffsetHalfway, yOffsetHalfway, rotateHalfway))

  const startAnimation = useCallback(
    () => {
      springsToLeftApi.start(getToState(xOffset, yOffset, rotate))
      springsToRightApi.start(getToState(-xOffset, yOffset, -rotate))
      springsToRightHalfwayApi.start(getToState(-xOffsetHalfway, yOffsetHalfway, -rotateHalfway))
      springsToLeftHalfwayApi.start(getToState(xOffsetHalfway, yOffsetHalfway, rotateHalfway))
    },
    [
      springsToLeftApi,
      springsToRightApi,
      springsToRightHalfwayApi,
      springsToLeftHalfwayApi,
    ]
  )

  useEffect(() => {
    startAnimation()
  },[])

  const handleHover = useCallback(
    () => {
      springsToLeftApi.start({
        ...from,
        config: springConfigRigid
      })
      springsToRightApi.start({
        ...from,
        config: springConfigRigid
      })
      springsToRightHalfwayApi.start({
        ...from,
        config: springConfigRigid
      })
      springsToLeftHalfwayApi.start({
        ...from,
        config: springConfigRigid
      })
    },
    [
      springsToLeftApi,
      springsToRightApi,
      springsToRightHalfwayApi,
      springsToLeftHalfwayApi,
    ]
  )


  return (
    <div
      className='relative h-48 mt-32 2xl:mt-72'
    >
      <div
        className='absolute inset-x-2/4 w-28 -translate-x-1/2'
        onMouseOver={handleHover}
        onMouseLeave={startAnimation}
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
