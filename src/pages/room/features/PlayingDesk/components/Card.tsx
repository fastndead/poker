import React, { CSSProperties, useState } from 'react'
import { animated, useSpring } from '@react-spring/web'

type Props = {
  value?: string
  isRevealed?: boolean
  animationProp: CSSProperties 
}

export default function Card({ isRevealed, animationProp, value }: Props) {
  const { rotateY, opacity } = useSpring({
    opacity: isRevealed ? 1 : 0,
    rotateY: isRevealed ? 180 : 0,
    config: { mass: 10, tension: 500, friction: 80 },
  })

  return (
    <animated.div
      className='absolute'
      style={{
        height: 80,
        width: 50,
        ...animationProp
      }}
    >
      <animated.div 
        className='absolute card'
        style={{ 
          perspective: 400,
          opacity: opacity.to(o => 1 - o),
          rotateY
        }}
      >

      </animated.div>

      <animated.div
        className='absolute border cursor-pointer bg-white border-primary-emphasis rounded-lg shadow-card z-1'
        style={{
          scaleX: -1,
          scaleY: 1,
          perspective: 400,
          height: 80,
          width: 50,
          opacity: opacity.to(o => o > 0.5 ? o : 0),
          rotateY,
        }}
      >
        <div
          className='absolute inset-2/4 w-6 h-6 flex items-center justify-center font-normal -translate-x-1/2 -translate-y-1/2 text-2xl'
        >
          {value}
        </div>
      </animated.div>
    
    </animated.div>
  )
}
