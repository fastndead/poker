import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

const FloatingContext = createContext<{ currentlyFloating: number; interval: number }>({
  currentlyFloating: 0,
  interval: 0,
})

export const FloatingProvider = ({ children }: { children: ReactNode }) => {
  const [currentlyFloating, setCurrentlyFloating] = useState(0)

  const timeInterval = 5000
  useEffect(() => {
    const viewportWidth = window.innerWidth

    const interval = 10
    const step = viewportWidth / (timeInterval / interval)

    const updateFloating = () => {
      setCurrentlyFloating((prev) => {
        const nextValue = prev + step
        return nextValue >= viewportWidth ? 0 : nextValue
      })
    }

    const timer = setInterval(updateFloating, interval)

    return () => clearInterval(timer)
  }, [])

  return (
    <FloatingContext.Provider value={{ currentlyFloating, interval: timeInterval }}>
      {children}
    </FloatingContext.Provider>
  )
}

export const useFloating = () => {
  const context = useContext(FloatingContext)
  if (context === undefined) {
    throw new Error('useFloating must be used within a FloatingProvider')
  }
  return context
}
