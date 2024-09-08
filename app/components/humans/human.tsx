import useStoreHumans from '@/app/store/useStoreHumans'
import { AnimatedSprite, Sprite, useTick } from '@pixi/react'
import { useEffect, useState } from 'react'
import * as PIXI from 'pixi.js'
import useStore from '@/app/store/useStore'

const Human = ({ id }: { id: number }) => {
  const { gameStatus } = useStore()
  const size = useStoreHumans(
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    (state: { humans: { size: any }[] }) => state.humans[id].size,
  )
  const x = useStoreHumans(
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    (state: { humans: { x: any }[] }) => state.humans[id].x,
  )
  const y = useStoreHumans(
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    (state: { humans: { y: any }[] }) => state.humans[id].y,
  )
  const dirX = useStoreHumans(
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    (state: { humans: { dirX: any }[] }) => state.humans[id].dirX,
  )
  const src = useStoreHumans(
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    (state: { humans: { src: any }[] }) => state.humans[id].src,
  )
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const move = useStoreHumans((state: { move: any }) => state.move)

  const [frames, setFrames] = useState<PIXI.Texture[]>([])

  console.log('render human')

  useTick((delta) => {
    if (gameStatus === 'playing') move(id, delta)
  })

  useEffect(() => {
    // Cargar el spritesheet usando PIXI.Assets.load
    const loadTextures = async () => {
      try {
        // Cargar el spritesheet y la imagen
        const spriteSheet = await PIXI.Assets.load('spritesheet_human.json')
        const { animations, textures } = spriteSheet
        const frames = animations.walk || []
        setFrames(frames)
      } catch (error) {
        console.error('Error loading spritesheet:', error)
      }
    }

    loadTextures()
  }, [])

  return (
    <>
      {frames.length > 0 && (
        <AnimatedSprite
          textures={frames}
          isPlaying={true}
          animationSpeed={gameStatus === 'playing' ? 0.2 : 0.0}
          loop={true}
          x={x}
          y={y}
          anchor={0.5}
          scale={{ x: dirX > 0 ? 0.25 : -0.25, y: 0.25 }}
        />
      )}
    </>
  )
}

export default Human
