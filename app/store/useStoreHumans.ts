import { create } from 'zustand'
import useStore from './useStore'
import img1 from '@/public/chicken.png'
import img2 from '@/public/parrot.png'

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
  humans: Entity[]
  move: (id: number, delta: number) => void
  updateSrc: (url: string) => void
}

const useStoreHumans = create<StateType>((set, get) => {
  // Variables para acumular el movimiento que no son parte del estado
  const accumX: number[] = []
  const accumY: number[] = []

  return {
    humans: [
      {
        x: 0,
        y: 0,
        dirX: 0.5,
        dirY: 0.25,
        speed: 2.55,
        size: 25,
        src: img2.src,
      },
      {
        x: 100,
        y: 100,
        dirX: 0.25,
        dirY: 1,
        speed: 2.55,
        size: 25,
        src: img2.src,
      },
      {
        x: 150,
        y: 150,
        dirX: 0.75,
        dirY: 0.75,
        speed: 2.55,
        size: 25,
        src: img1.src,
      },
      {
        x: 40,
        y: 40,
        dirX: 0.25,
        dirY: 0.5,
        speed: 2.55,
        size: 25,
        src: img1.src,
      },
      {
        x: 160,
        y: 160,
        dirX: 1,
        dirY: 0.25,
        speed: 2.55,
        size: 25,
        src: img1.src,
      },
    ],
    move: (id: number, delta: number) =>
      set((state: StateType) => {
        const { screenWidth, screenHeight } = useStore.getState()
        const human = state.humans[id]
        const velocity = human.speed

        // Calcular desplazamiento
        const deltaX = velocity * human.dirX * delta
        const deltaY = velocity * human.dirY * delta

        // Acumular el desplazamiento en las variables locales
        accumX[id] = (accumX[id] || 0) + deltaX
        accumY[id] = (accumY[id] || 0) + deltaY

        let newX = human.x
        let newY = human.y

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
          human.dirX *= -1
        }

        if (newY < minY || newY > maxY) {
          newY = Math.max(minY, Math.min(newY, maxY))
          human.dirY *= -1
        }

        // Actualizar el estado solo si hay cambios en las posiciones
        if (newX !== human.x || newY !== human.y) {
          const updatedHumans = state.humans.map((e, index) =>
            index === id ? { ...e, x: newX, y: newY } : e,
          )
          return { humans: updatedHumans }
        }

        return state
      }),
    updateSrc: (url: string) =>
      set((state: StateType) => {
        const updatedHumans = state.humans.map((human) => ({
          ...human,
          src: url, // Actualizar el src con la URL proporcionada
        }))
        return { humans: updatedHumans }
      }),
  }
})

export default useStoreHumans
