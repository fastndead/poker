import React, { ReactNode, useCallback, useEffect } from 'react'
import { ReactComponent as CloseModalSvg } from 'assets/closeModal.svg'
import { animated, useSpring } from '@react-spring/web'
import classNames from 'classnames'

type Props = {
  isVisible: boolean
  children: ReactNode
  title?: string
  className?: string
  onClose(): void
}

export default function Modal({ className, isVisible, children, title, onClose }: Props) {
  const [modalOverlaySpring, modalOverlaySpringApi] = useSpring(() => {
    return isVisible
      ? { 
        from:{
          opacity: 0,
          width: 0
        }, 
        to: [
          { width: window.innerWidth },
          { opacity: 1 },
        ]
      }
      : { opacity: 0, width: 0 }
  }, [])

  const [modalSpring, modalSpringApi] = useSpring(() => {
    const styles = isVisible
      ? { opacity: 1, y: 0 }
      : { opacity: 0, y: 50 }

    return {
      ...styles,
      config: {
        tension: 280, friction: 60
      }
    }
  }, [isVisible])

  useEffect(() => {
    if (!isVisible) {
      modalOverlaySpringApi.start({
        to: [
          { opacity: 0 },
          { width: 0 }
        ]
      })
    } else {
      modalOverlaySpringApi.start({
        from:{
          opacity: 0,
          width: 0
        }, 
        to: [
          { width: window.innerWidth, immediate: true },
          { opacity: 1 },
        ] })
    }
  }, [isVisible, modalOverlaySpringApi])

  const handleClose = useCallback(() => {

    onClose()

  }, [onClose])

  return (
    <animated.div
      style={{
        ...modalOverlaySpring,
      }}
      className={classNames('fixed top-0 right-0 w-screen h-screen flex justify-center items-center')}
    >

      <animated.div 
        className={classNames('relative bg-white z-50 rounded-3xl p-6 shadow-modal', className)}
        style={{
          ...modalSpring
        }}
      >
        <div
          className='w-full h-11 flex justify-between'
        >
          <h3
            className='font-normal text-2xl'
          >
            {title || ''}
          </h3>
          <CloseModalSvg
            onClick={handleClose}
            className='cursor-pointer'
          />
        </div>
        {children}
      </animated.div>

      <animated.div
        style={{
          width: modalOverlaySpring.width,
        }}
        className='fixed top-0 right-0 opacity-70 w-screen h-screen bg-modal-grey z-40 '
      />
    </animated.div>
  )
}
