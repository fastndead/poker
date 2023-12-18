import classNames from 'classnames'
import './Button.css'
import React, { ReactNode } from 'react'

type Props = {
  htmlType?: 'button' | 'submit' | 'reset'
  type?: 'primary' | 'secondary'
  label?: ReactNode | string
  onClick?(): void
  className?: string
  children?: ReactNode
}
export default function Button({ htmlType, type, label, children, onClick, className }: Props) {
  return (
    <div
      className={classNames(
        {
          'btn-primary': type === 'primary',
          'btn-secondary': type === 'secondary',
        },
        'btn-base',
        className
      )}
    >
      <div className='upper-side'></div>
      <div className='right-side-container'>
        <button
          onClick={onClick}
          type={htmlType || 'button'}
          tabIndex={0}
        >
          {label || children}
        </button>
        <div className='right-side'></div>
      </div>
    </div>
  )
}
