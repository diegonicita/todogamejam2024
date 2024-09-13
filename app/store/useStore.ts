import { create } from 'zustand'

type StateType = {
  screenWidth: number
  screenHeight: number
  gameStatus: 'waiting' | 'playing' | 'gameOver'
  score: number
  setGameStatus: (status: 'waiting' | 'playing' | 'gameOver') => void
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  getGameStatus: () => 'waiting' | 'playing' | 'gameOver' | any
  restartGame: () => void
  addScore: () => void
  imageDataUrl: string
  setImageDataUrl: (url: string) => void
}

const useStore = create<StateType>((set) => ({
  screenWidth: 600,
  screenHeight: 400,
  gameStatus: 'waiting',
  score: 0,
  imageDataUrl: '',
  setImageDataUrl: (url: string) => set({ imageDataUrl: url }),
  setGameStatus: (status: 'waiting' | 'playing' | 'gameOver') =>
    set({ gameStatus: status }),
  getGameStatus: () => {
    return useStore.getState().gameStatus
  },
  restartGame: () => set({ gameStatus: 'waiting', score: 0 }),
  addScore: () => set((state) => ({ score: state.score + 1 })),
}))

export default useStore
