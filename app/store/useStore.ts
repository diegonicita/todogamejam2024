import { create } from 'zustand'

type StateType = {
  screenWidth: number
  screenHeight: number
  gameStatus: 'waiting' | 'playing' | 'gameOver'
  heroHealth: number
  heroLifes: number
  heroScore: number
  setGameStatus: (status: 'waiting' | 'playing' | 'gameOver') => void
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  getGameStatus: () => 'waiting' | 'playing' | 'gameOver' | any
  heroGetDamage: () => void
  restartGame: () => void
  addScore: () => void
}

const useStore = create<StateType>((set) => ({
  screenWidth: 640,
  screenHeight: 480,
  gameStatus: 'waiting',
  setGameStatus: (status: 'waiting' | 'playing' | 'gameOver') =>
    set({ gameStatus: status }),
  getGameStatus: () => {
    return useStore.getState().gameStatus
  },
  heroHealth: 10,
  heroLifes: 1,
  heroScore: 0,
  heroGetDamage: () =>
    set((state) => {
      if (state.heroHealth <= 0) {
        const newLifes = state.heroLifes - 1
        if (newLifes <= 0) {
          return {
            heroHealth: 0,
            heroLifes: newLifes,
            gameStatus: 'gameOver',
          }
        }
        return { heroHealth: 100, heroLifes: newLifes }
      }
      return { heroHealth: state.heroHealth - 1 }
    }),
  restartGame: () =>
    set({ gameStatus: 'waiting', heroHealth: 10, heroLifes: 1, heroScore: 0 }),
  addScore: () => set((state) => ({ heroScore: state.heroScore + 1 })),
}))

export default useStore
