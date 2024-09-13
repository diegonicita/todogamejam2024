import React from 'react'
import Enemy from '@/app/components/enemies/enemy'
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
