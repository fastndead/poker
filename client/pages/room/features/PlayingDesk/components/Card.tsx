import React, { CSSProperties, useState } from 'react'
import { animated, useSpring } from '@react-spring/web'
import classNames from 'classnames'
import ArrowSvg from 'assets/arrow.svg'

type Props = {
  value?: string | null
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
        ...animationProp,
      }}
    >
      {value && !isRevealed && <ArrowSvg
        className='absolute -top-6 left-1/2 -translate-x-2/4'
                               />}
      <animated.div
        className={classNames('card absolute', {
          'bg-primary-emphasis': value,
        })}
        style={{
          perspective: 400,
          opacity: opacity.to((o) => 1 - o),
          rotateY,
        }}
      >
      </animated.div>

      <animated.div
        className='z-1 absolute cursor-pointer rounded-lg border border-primary-emphasis bg-white shadow-card'
        style={{
          scaleX: -1,
          scaleY: 1,
          perspective: 400,
          height: 80,
          width: 50,
          opacity: opacity.to((o) => (o > 0.5 ? o : 0)),
          rotateY,
        }}
      >
        <div
          className='absolute inset-2/4 flex h-6 w-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center text-2xl font-normal'
        >
          {value}
        </div>
      </animated.div>
    </animated.div>
  )
}
