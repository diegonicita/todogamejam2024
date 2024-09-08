import { create } from 'zustand'

type StateType = {
  keyUp: boolean
  keyDown: boolean
  keyLeft: boolean
  keyRight: boolean
  upPressed: () => void
  downPressed: () => void
  leftPressed: () => void
  rightPressed: () => void
  upReleased: () => void
  downReleased: () => void
  leftReleased: () => void
  rightReleased: () => void
}

const useStoreKeyboard = create<StateType>((set) => ({
  keyUp: false,
  keyDown: false,
  keyLeft: false,
  keyRight: false,
  upPressed: () => set({ keyUp: true }),
  downPressed: () => set({ keyDown: true }),
  leftPressed: () => set({ keyLeft: true }),
  rightPressed: () => set({ keyRight: true }),
  upReleased: () => set({ keyUp: false }),
  downReleased: () => set({ keyDown: false }),
  leftReleased: () => set({ keyLeft: false }),
  rightReleased: () => set({ keyRight: false }), 
}))

export default useStoreKeyboard
