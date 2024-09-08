import { useEffect } from 'react'
import useStoreKeyboard from '../store/useStoreKeyboard'

const useKeyboard = () => {
  const {
    upPressed,
    downPressed,
    leftPressed,
    rightPressed,
    upReleased,
    downReleased,
    leftReleased,
    rightReleased,
    keyDown,
    keyUp,
    keyLeft,
    keyRight,
  } = useStoreKeyboard()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'w') upPressed()
      if (e.key === 's') downPressed()
      if (e.key === 'a') leftPressed()
      if (e.key === 'd') rightPressed()
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'w') upReleased()
      if (e.key === 's') downReleased()
      if (e.key === 'a') leftReleased()
      if (e.key === 'd') rightReleased()
    }

    // Flaky Wooden Thankful Lion
    // 26403


    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [
    upPressed,
    downPressed,
    leftPressed,
    rightPressed,
    upReleased,
    downReleased,
    leftReleased,
    rightReleased,
  ])

  return {
    keyDown,
    keyUp,
    keyLeft,
    keyRight,
  }
}

export default useKeyboard
