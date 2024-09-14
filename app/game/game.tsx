/* eslint-disable @next/next/no-img-element */
'use client'
import { Sprite, Stage, Container, Text } from '@pixi/react'
import { TextStyle } from 'pixi.js'
import useMounted from '../hooks/useMounted'
import useStore from '@/app/store/useStore'
import HeroController from '@/app/components/hero/heroController'
import EnemyController from '../components/enemies/enemyController'
import useStoreEnemies from '../store/useStoreEnemies'
import useStoreHero from '../store/useStoreHero'
import dynamic from 'next/dynamic'
import HumanController from '../components/humans/humanController'
import Heart from '../components/svgs/heart'
import GrayHeart from '../components/svgs/grayHeart'
import Screenshot from '../components/screenshot/screenshot'

const Music = dynamic(() => import('../components/music/music'))

export default function Game({ imageUrl }: { imageUrl: string }) {
  const { isMounted } = useMounted()
  const {
    screenHeight,
    screenWidth,
    gameStatus,
    score,
    restartGame,
    imageDataUrl,
  } = useStore()
  const { updateSrc, restartEnemies } = useStoreEnemies()
  const { restartHero, health, lifes } = useStoreHero()

  const handleRestart = () => {
    restartGame()
    restartEnemies()
    restartHero()
  }

  return (
    <div className="flex text-primary text-lg">
      {isMounted && <Music gameStatus={gameStatus} />}
      {isMounted && gameStatus !== 'waiting' && (
        <div className="flex flex-wrap justify-center w-full">
          <div className="flex">
            <div className="hidden md:flex mt-2 px-4 md:w-40 md:flex-col md:gap-4">
              <div>
                <div className="font-bold">Score </div>
                <div className="text-yellow-400 font-semibold text-sm">
                  {score} points
                </div>
              </div>
              <div>
                <div className="font-bold mb-1">Lives</div>
                <div className="flex">
                  {lifes > 0 ? <Heart /> : <GrayHeart />}
                  {lifes > 1 ? <Heart /> : <GrayHeart />}
                  {lifes > 2 ? <Heart /> : <GrayHeart />}
                  {lifes > 3 ? <Heart /> : <GrayHeart />}
                  {lifes > 4 ? <Heart /> : <GrayHeart />}
                </div>
              </div>
              <div className="w-4/5 mx-auto">
                <div className="font-bold"> Health </div>
                <progress
                  className="progress progress-success"
                  value={health}
                  max="100"
                />
              </div>
              {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
              <div className="btn btn-accent" onClick={handleRestart}>
                Menu Principal
              </div>
              {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
              <div className="btn btn-accent" onClick={handleRestart}>
                Tomar una Foto{' '}
              </div>
            </div>
            <div className="relative dwshadow-2xl bg-primary border border-primary rounded-3xl p-4">
              <Stage
                width={screenWidth}
                height={screenHeight}
                options={{ background: 0x000000 }}
              >
                {imageUrl && (
                  <Sprite
                    image={imageUrl}
                    x={0}
                    y={0}
                    width={800}
                    height={800}
                    scale={1.6}
                    anchor={{ x: 0, y: 0 }}
                  />
                )}
                <EnemyController />
                <HumanController />
                <HeroController />
                <Screenshot />
                {gameStatus === 'gameOver' && (
                  <Container x={200} y={150}>
                    <Text
                      text={'GAME OVER'}
                      anchor={0.5}
                      x={130}
                      y={100}
                      filters={[]}
                      style={
                        new TextStyle({
                          align: 'center',
                          fill: '0xffffff',
                          fontSize: 24,
                          letterSpacing: 10,
                          dropShadow: true,
                          dropShadowColor: '#E72264',
                          dropShadowDistance: 6,
                        })
                      }
                    />
                  </Container>
                )}
              </Stage>
              {/* <div className="flex justify-center my-8 text-neutral flex-col items-center">
                <div>Screen Shot</div>
                <div className="h-44 w-44 border-4 border-red-500">
                  <img src={imageDataUrl} alt="Generated Texture" />
                </div>
              </div> */}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
