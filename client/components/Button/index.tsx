import classNames from 'classnames'
import React from 'react'

type Props = {
  htmlType?: 'button' | 'submit' | 'reset'
  type?: 'primary' | 'secondary'
  label: string
  onClick?(): void
  className?: string
}
export default function Button({ htmlType, type, label, onClick, className }:Props) {
  return (
    <button
      onClick={onClick}
      type={htmlType || 'button'}
      className={classNames({
        'btn-primary': type === 'primary',
        'btn-secondary': type === 'secondary',
      }) + ' ' + className}
      tabIndex={0}
    >
      {label}
    </button>
  )
}
