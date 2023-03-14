import React from 'react'
import { animated, useSpring } from '@react-spring/web'

export default function CardsSpread() {
  const springsToLeft = useSpring({
    from: { 
      x: 0,
      y: 0,
      rotate: 0
    },
    to: { 
      x: 100,
      y: 10,
      rotate:30 
    },
  })
  const springsToRight = useSpring({
    from: {
      x: 0,
      y: 0,
      rotate: 0
    },
    to: {
      x: -100,
      y: 10,
      rotate: -30
    },
  })
  const springsToRightHalfway = useSpring({
    from: {
      x: 0,
      y: 0,
      rotate: 0
    },
    to: {
      x: -50,
      y: 5,
      rotate: -20
    },
  })
  const springsToLeftHalfway = useSpring({
    from: {
      x: 0,
      y: 0,
      rotate: 0
    },
    to: {
      x: 50,
      y: 5,
      rotate: 20
    },
  })
  return (
    <div
      className='relative h-96'
    >
      <animated.div
        className='absolute h-40 w-28 border border-primary-emphasis rounded-lg bg-secondary-emphasis inset-28'
        style={{
          zIndex: 2,
          ...springsToRightHalfway
        }}
      />
      <animated.div
        className='absolute h-40 w-28 border border-primary-emphasis rounded-lg bg-secondary-emphasis inset-28'
        style={{
          zIndex: 2,
          ...springsToLeftHalfway
        }}
      />
      <animated.div
        className='absolute h-40 w-28 border border-primary-emphasis rounded-lg bg-secondary-emphasis inset-28'
        style={{
          zIndex: 1,
          ...springsToLeft
        }}
      />
      <animated.div
        className='absolute h-40 w-28 border border-primary-emphasis rounded-lg bg-secondary-emphasis inset-28'
        style={{
          zIndex: 1,
          ...springsToRight
        }}
      />
      <animated.div
        className='absolute h-40 w-28 border border-primary-emphasis rounded-lg bg-secondary-emphasis inset-28'
        style={{
          zIndex: 3
        }}
      />
    </div>
  )}
