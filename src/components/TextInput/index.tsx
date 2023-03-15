import classNames from 'classnames'
import React from 'react'

type Props = {
  placeholder: string
  onChange?(): void
  className?: string
}

export default function TextInput({ placeholder, onChange, className }:Props) {
  return (
    <input
      placeholder={placeholder}
      onChange={onChange}
      className={classNames(className, 'text-input', 'border-none', 'outline-none')}
      tabIndex={0}
    />
  )
}
