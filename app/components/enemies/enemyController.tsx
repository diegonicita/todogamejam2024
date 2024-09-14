import React from 'react'
import Enemy from './enemy'
import useStore from '@/app/store/useStoreEnemies'

const EnemyController = () => {
  const { enemies } = useStore()

  return (
    <>
      {enemies.map((e, index) => (
        <Enemy key={index.toString()} id={index} />
      ))}
    </>
  )
}

export default EnemyController
