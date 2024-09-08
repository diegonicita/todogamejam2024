import useStoreHero from '@/app/store/useStoreHero'
import { AnimatedSprite } from '@pixi/react'
import { useTick } from '@pixi/react'
import { useEffect, useState } from 'react'
import * as PIXI from 'pixi.js'
import useStoreEnemies from '@/app/store/useStoreEnemies'
import useStoreHumans from '@/app/store/useStoreHumans'
import useStore from '@/app/store/useStore'

const Hero = () => {
  const {
    gameStatus,
    heroHealth,
    addScore,
    heroGetDamage,
    heroLifes,
    heroScore,
  } = useStore()
  const { move, play, playingSound, checkCollisions } = useStoreHero()
  const x = useStoreHero((state) => state.hero.x)
  const y = useStoreHero((state) => state.hero.y)
  const dirX = useStoreHero((state) => state.hero.dirX)
  const dirY = useStoreHero((state) => state.hero.dirY)
  const [flyingFrames, setFlyingFrames] = useState<PIXI.Texture[]>([])
  const [sunFrames, setSunFrames] = useState<PIXI.Texture[]>([])
  const [coinFrames, setCoinFrames] = useState<PIXI.Texture[]>([])
  const { enemies } = useStoreEnemies()
  const { humans } = useStoreHumans()
  const [collisionWithEnemy, setCollisionWithEnemy] = useState(false)
  const [collisionWithHuman, setCollisionWithHuman] = useState(false)

  useTick((delta) => {
    if (gameStatus === 'playing')
      move(x + dirX * delta * 1, y + dirY * delta * 1)
    const result1 = checkCollisions(enemies)
    setCollisionWithEnemy(result1)
    if (result1 && gameStatus !== 'gameOver') heroGetDamage()
    const result2 = checkCollisions(humans)
    if (result2 && gameStatus !== 'gameOver') addScore()
    setCollisionWithHuman(result2)
    // if (dirX === 0 && dirY === 0) return
    if (
      gameStatus === 'playing' &&
      playingSound.estado === 'stop' &&
      (result1 || result2)
    )
      play()
  })

  useEffect(() => {
    // Cargar el spritesheet usando PIXI.Assets.load
    const loadTextures = async () => {
      try {
        // Cargar el spritesheet y la imagen
        const spriteSheet = await PIXI.Assets.load('spritesheet_hero.json')
        const { animations, textures } = spriteSheet
        const frames1 = animations.fly || []
        const frames2 = animations.sun || []
        const frames3 = animations.coin || []
        setFlyingFrames(frames1)
        setSunFrames(frames2)
        setCoinFrames(frames3)
      } catch (error) {
        console.error('Error loading spritesheet:', error)
      }
    }
    loadTextures()
  }, [])

  return (
    <>
      {!collisionWithEnemy &&
        !collisionWithHuman &&
        flyingFrames.length > 0 && (
          <AnimatedSprite
            textures={flyingFrames}
            isPlaying={true}
            animationSpeed={0.5}
            loop={true}
            x={x}
            y={y}
            anchor={0.5}
            scale={{ x: 0.25, y: 0.25 }}
          />
        )}
      {collisionWithEnemy && sunFrames.length > 0 && (
        <AnimatedSprite
          textures={sunFrames}
          isPlaying={true}
          animationSpeed={gameStatus === 'playing' ? 0.1 : 0.0}
          loop={true}
          x={x}
          y={y}
          anchor={0.5}
          scale={{ x: 0.4, y: 0.4 }}
        />
      )}
      {collisionWithHuman && coinFrames.length > 0 && (
        <AnimatedSprite
          textures={coinFrames}
          isPlaying={true}
          animationSpeed={0.5}
          loop={true}
          x={x}
          y={y}
          anchor={0.5}
          scale={{ x: 0.5, y: 0.5 }}
        />
      )}
    </>
  )
}

export default Hero
