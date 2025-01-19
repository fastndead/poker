import { useWindowSize } from './useWindowSize'

export function useIsMobile() {
  const windowSize = useWindowSize()

  return windowSize[0] < 1080
}
