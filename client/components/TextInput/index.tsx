import { useSpring, animated } from '@react-spring/web'
import { config } from '@react-spring/web'
import classNames from 'classnames'
import React, { HTMLAttributes, ReactEventHandler } from 'react'
import './Input.css'

export interface InputProps extends HTMLAttributes<HTMLDivElement> {
  placeholder: string
  onChange?: ReactEventHandler<HTMLInputElement>
  value?: string
  className?: string
  validationError?: string | null
}

export default function TextInput({
  validationError,
  value,
  placeholder,
  onChange,
  className,
  ...props
}: InputProps) {
  const [validationErrorSpring] = useSpring(() => {
    return validationError
      ? {
          from: { opacity: 0, height: 0 },
          to: { opacity: 1, height: 30 },
          config: config.stiff,
        }
      : {
          from: { opacity: 1, height: 30 },
          to: { opacity: 0, height: 0 },
          config: config.stiff,
        }
  }, [validationError])
  return (
    <div
      className={classNames('text-input', className)}
      {...props}
    >
      <animated.div
        className='w-full text-center text-sm text-danger'
        style={{
          ...validationErrorSpring,
        }}
      >
        {validationError || ''}
      </animated.div>
      <div className='upper-side'></div>
      <div className='right-side-container'>
        <input
          placeholder={placeholder}
          onChange={onChange}
          value={value}
          className={classNames('border-none', 'outline-none', 'text-black', {
            'text-input-danger': validationError,
          })}
          tabIndex={0}
        />
        <div className='right-side'></div>
      </div>
    </div>
  )
}
