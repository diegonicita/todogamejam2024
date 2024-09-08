/* eslint-disable @next/next/no-img-element */
'use client'
import { Sprite, Stage, Container, Text } from '@pixi/react'
import { TextStyle } from 'pixi.js'
import useMounted from './hooks/useMounted'
import useStore from '@/app/store/useStore'
import HeroController from '@/app/components/hero/heroController'
import EnemyController from './components/enemies/enemyController'
import useStoreEnemies from './store/useStoreEnemies'
import useStoreHero from './store/useStoreHero'
import dynamic from 'next/dynamic'
import HumanController from './components/humans/humanController'
import Heart from './components/svgs/heart'
import GrayHeart from './components/svgs/grayHeart'

const Music = dynamic(() => import('./components/music/music'))

export default function Game({imageUrl}:{imageUrl: string}) {
  const { isMounted } = useMounted()
  const {
    screenHeight,
    screenWidth,
    gameStatus,
    heroHealth,
    heroLifes,
    heroScore,
    restartGame,
  } = useStore()
  
  console.log('render game') 

  const { updateSrc, restartGameEnemies } = useStoreEnemies()
  const { restartHero } = useStoreHero()   

  const handleRestart = () => {
    restartGame()
    restartGameEnemies()
    restartHero()
  }

  console.log(gameStatus)

  return (
    <div className="flex justity-center text-primary text-lg">
      {isMounted && <Music gameStatus={gameStatus} />}
      {isMounted && gameStatus !== 'waiting' && (
        <div className="flex flex-wrap justify-center w-full my-10">
          <div className="flex">
            <div className="hidden lg:flex mt-2 px-4 lg:w-40 lg:flex-col lg:gap-4">
              <div>
                <div className="font-bold">Score </div>
                <div className="text-yellow-400 font-semibold text-sm">
                  {heroScore} points
                </div>
              </div>
              <div>
                <div className="font-bold mb-1">Lives</div>
                <div className="flex">
                  {heroLifes > 0 ? <Heart /> : <GrayHeart />}
                  {heroLifes > 1 ? <Heart /> : <GrayHeart />}
                  {heroLifes > 2 ? <Heart /> : <GrayHeart />}
                  {heroLifes > 3 ? <Heart /> : <GrayHeart />}
                  {heroLifes > 4 ? <Heart /> : <GrayHeart />}
                </div>
              </div>
              <div className="w-4/5 mx-auto">
                <div className="font-bold"> Health </div>
                <progress
                  className="progress progress-success"
                  value={heroHealth}
                  max="100"
                />
              </div>
              {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
              <div className="btn btn-accent" onClick={handleRestart}>
                Menu Principal
              </div>
            </div>
            <div className="shadow-2xl bg-primary border border-primary rounded-3xl p-4">
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
                    width={650}
                    height={650}
                    anchor={{ x: 0, y: 0 }}
                  />
                )}
                <EnemyController />
                <HumanController />
                <HeroController />

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
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
