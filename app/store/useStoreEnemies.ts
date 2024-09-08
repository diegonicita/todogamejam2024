import { create } from 'zustand'
import useStore from './useStore'
import img1 from '@/public/chicken.png'
import img2 from '@/public/parrot.png'
import img3 from '@/public/ship.png'

type Entity = {
  x: number
  y: number
  dirX: number
  dirY: number
  speed: number
  size: number
  src: string
}

type StateType = {
  enemies: Entity[]
  move: (id: number, delta: number) => void
  updateSrc: (url: string) => void
  restartGameEnemies: () => void
}

const useStoreEnemies = create<StateType>((set, get) => {
  // Variables para acumular el movimiento que no son parte del estado
  const accumX: number[] = []
  const accumY: number[] = []

  return {
    enemies: [
      {
        x: 0,
        y: 0,
        dirX: 0.5,
        dirY: 0.25,
        speed: 5.55,
        size: 32,
        src: img3.src,
      },
      {
        x: 100,
        y: 100,
        dirX: 0.25,
        dirY: 1,
        speed: 2,
        size: 32,
        src: img3.src,
      },
      {
        x: 150,
        y: 150,
        dirX: 0.75,
        dirY: 0.75,
        speed: 2,
        size: 32,
        src: img3.src,
      },
      {
        x: 40,
        y: 40,
        dirX: 0.25,
        dirY: 0.5,
        speed: 0.5,
        size: 32,
        src: img3.src,
      },
      {
        x: 160,
        y: 160,
        dirX: 1,
        dirY: 0.25,
        speed: 1,
        size: 32,
        src: img3.src,
      },
    ],
    move: (id: number, delta: number) =>
      set((state: StateType) => {
        const { screenWidth, screenHeight } = useStore.getState()
        const enemy = state.enemies[id]
        const velocity = enemy.speed

        // Calcular desplazamiento
        const deltaX = velocity * enemy.dirX * delta
        const deltaY = velocity * enemy.dirY * delta

        // Acumular el desplazamiento en las variables locales
        accumX[id] = (accumX[id] || 0) + deltaX
        accumY[id] = (accumY[id] || 0) + deltaY

        let newX = enemy.x
        let newY = enemy.y

        // Solo actualizar el estado si la acumulación supera 1 píxel
        if (Math.abs(accumX[id]) >= 4) {
          newX += Math.trunc(accumX[id])
          accumX[id] -= Math.trunc(accumX[id])
        }

        if (Math.abs(accumY[id]) >= 4) {
          newY += Math.trunc(accumY[id])
          accumY[id] -= Math.trunc(accumY[id])
        }

        // Límites de pantalla
        const minX = 0
        const maxX = screenWidth
        const minY = 0
        const maxY = screenHeight

        // Verificar si el enemigo choca con los bordes y cambiar dirección si es necesario
        if (newX < minX || newX > maxX) {
          newX = Math.max(minX, Math.min(newX, maxX))
          enemy.dirX *= -1
        }

        if (newY < minY || newY > maxY) {
          newY = Math.max(minY, Math.min(newY, maxY))
          enemy.dirY *= -1
        }

        // Actualizar el estado solo si hay cambios en las posiciones
        if (newX !== enemy.x || newY !== enemy.y) {
          const updatedEnemies = state.enemies.map((e, index) =>
            index === id ? { ...e, x: newX, y: newY } : e,
          )
          return { enemies: updatedEnemies }
        }

        return state
      }),
    updateSrc: (url: string) =>
      set((state: StateType) => {
        const updatedEnemies = state.enemies.map((enemy) => ({
          ...enemy,
          src: url, // Actualizar el src con la URL proporcionada
        }))
        return { enemies: updatedEnemies }
      }),
    restartGameEnemies: () => {
      set({
        enemies: [
          {
            x: 0,
            y: 0,
            dirX: 0.5,
            dirY: 0.25,
            speed: 5.55,
            size: 32,
            src: img3.src,
          },
          {
            x: 100,
            y: 100,
            dirX: 0.25,
            dirY: 1,
            speed: 2,
            size: 32,
            src: img3.src,
          },
          {
            x: 150,
            y: 150,
            dirX: 0.75,
            dirY: 0.75,
            speed: 2,
            size: 32,
            src: img3.src,
          },
          {
            x: 40,
            y: 40,
            dirX: 0.25,
            dirY: 0.5,
            speed: 0.5,
            size: 32,
            src: img3.src,
          },
          {
            x: 160,
            y: 160,
            dirX: 1,
            dirY: 0.25,
            speed: 1,
            size: 32,
            src: img3.src,
          },
        ],
      }) // Reiniciar el estado del juego
    },
  }
})

export default useStoreEnemies
