import { create } from 'zustand'

type Entity = {
  x: number
  y: number
  dirX: number
  dirY: number
  speed: number
  size: number
}

type StateType = {
  hero: Entity
  health: number
  lifes: number
  move: (newX: number, newY: number) => void
  playingSound: { estado: 'start' | 'playing' | 'stop' }
  play: () => void
  checkCollisions: (enemies: Entity[]) => boolean
  getDamage: () => void
  restartHero: () => void
}

const useStoreHero = create<StateType>((set) => {
  return {
    hero: {
      x: 320,
      y: 200,
      dirX: 0,
      dirY: 0,
      speed: 5,
      size: 25,
    },
    health: 100,
    lifes: 5,
    move: (newX: number, newY: number) =>
      set((state) => ({
        hero: {
          ...state.hero,
          x: newX,
          y: newY,
        },
      })),
    playingSound: { estado: 'stop' },
    play: () => {
      set((state) => ({ playingSound: { estado: 'start' } }))
      setTimeout(() => {
        set((state) => ({ playingSound: { estado: 'playing' } }))
      }, 150) // Cambiar a false después de 1 segundo
      setTimeout(() => {
        set((state) => ({ playingSound: { estado: 'stop' } }))
      }, 500) // Cambiar a false después de 1 segundo
    },
    checkCollisions: (enemies: Entity[]) => {
      const { hero } = useStoreHero.getState()
      const heroRadius = hero.size / 2

      // Function to calculate the distance between two points
      const distance = (x1: number, y1: number, x2: number, y2: number) => {
        return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)
      }

      for (const enemy of enemies) {
        const enemyRadius = enemy.size / 2
        const dist = distance(hero.x, hero.y, enemy.x, enemy.y)

        // Check if the distance is less than the sum of the radii (collision detection)
        if (dist < heroRadius + enemyRadius) {
          return true // Collision detected
        }
      }

      return false // No collision detected
    },
    restartHero: () =>
      set((state) => ({
        hero: {
          x: 320,
          y: 200,
          dirX: 0,
          dirY: 0,
          speed: 5,
          size: 25,
        },
        lifes: 5,
        health: 100,
      })),
    getDamage: () =>
      set((state) => {
        if (state.health <= 0) {
          const newLifes = state.lifes - 1
          if (newLifes <= 0) {
            return {
              health: 0,
              lifes: newLifes,
            }
          }
          return { health: 100, lifes: newLifes }
        }
        return { health: state.health - 1 }
      }),
  }
})

export default useStoreHero
