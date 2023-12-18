import TextInput, { InputProps } from 'components/TextInput'
import React, { CSSProperties, useEffect, useRef, useState } from 'react'
import './InputAnimated.css'
import { animated, useSpring, useSpringValue } from '@react-spring/web'

export default function InputAnimated({ ...props }: InputProps) {
  const [ref, setRef] = useState<HTMLHeadingElement | null>()
  const [gradientProps, api] = useSpring(
    () => ({
      from: {
        '--gradient-value': '-300%',
      },
      to: {
        '--gradient-value': '300%',
      },
      config: {
        duration: 1000,
        tension: 280,
        friction: 220,
        mass: 10,
      },
      loop: true,
    }),
    [ref]
  )

  return (
    <animated.div
      ref={(newRef) => setRef(newRef)}
      style={
        {
          ...gradientProps,
          '--border-image-animated':
            'linear-gradient(to right, #B3BACD -300%, #B3BACD calc(var(--gradient-value) - 150%), #7893DC var(--gradient-value), #B3BACD calc(var(--gradient-value) + 150%), #B3BACD 300%)',
        } as unknown as CSSProperties
      }
    >
      <TextInput
        {...props}
        className='input-animated'
      />
    </animated.div>
  )
}
