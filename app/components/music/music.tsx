'use client'
import useMounted from '@/app/hooks/useMounted'
import { sound } from '@pixi/sound'
import { useEffect, useState } from 'react'
import useStoreHero from '@/app/store/useStoreHero'
import useStore from '@/app/store/useStore'

const Music = ({ gameStatus }: { gameStatus: string }) => {
  const { isMounted } = useMounted()
  const { playingSound, play } = useStoreHero()
  const [isPlaying, setIsPlaying] = useState(false)

  console.log('render')

  useEffect(() => {
    if (isMounted) {
      if (typeof document !== 'undefined') {
        sound.add('holes-and-bones', 'HolesAndBones.mp3')
        sound.play('holes-and-bones')
        sound.add('sonido1', 'kalimba.wav')
        console.log('mounted')
      }
    }
  }, [isMounted])

  console.log(gameStatus)

  useEffect(() => {
    if (gameStatus === 'playing') {
      if (sound.exists('holes-and-bones')) sound.play('holes-and-bones')
      console.log('playing')
    }
    if (gameStatus === 'waiting') {
      sound.stopAll()
      console.log('waiting')
    }
  }, [gameStatus])

  const playSound = () => {
    if (typeof document !== 'undefined')
      if (playingSound.estado === 'start' && isPlaying === false) {
        play()
        if (sound.exists('sonido1')) sound.play('sonido1')
        setIsPlaying(true)
      }
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (isMounted) {
      if (typeof document !== 'undefined') {
        if (isPlaying === true && playingSound.estado === 'stop')
          setIsPlaying(false)
        if (isPlaying === false && playingSound.estado === 'start') playSound()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playingSound])

  return <></>
}

export default Music
