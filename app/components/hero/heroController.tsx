import React from 'react'
import Hero from './hero'
import useKeyboard from '@/app/hooks/useKeyboard'
import useStoreHero from '@/app/store/useStoreHero'

const HeroController = () => {
  const { keyDown, keyUp, keyLeft, keyRight } = useKeyboard()
  const { hero } = useStoreHero()

  if (keyDown) hero.dirY = 1
  if (keyUp) hero.dirY = -1
  if (!keyDown && !keyUp) hero.dirY = 0
  if (keyLeft) hero.dirX = -1
  if (keyRight) hero.dirX = 1
  if (!keyLeft && !keyRight) hero.dirX = 0

  return <Hero />
}

export default HeroController
