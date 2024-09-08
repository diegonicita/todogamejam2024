import useStore from '@/app/store/useStore'
import useStoreEnemies from '../../store/useStoreEnemies'
import { SimpleMesh, Sprite, useTick } from '@pixi/react'

const Enemy = ({ id }: { id: number }) => {
  const { gameStatus } = useStore()
  const w = 500
  const h = 300

  const enemyX = useStoreEnemies((state) => state.enemies[id].x)
  const enemyY = useStoreEnemies((state) => state.enemies[id].y)
  const enemySrc = useStoreEnemies((state) => state.enemies[id].src)
  const move = useStoreEnemies((state) => state.move)

  console.log('render enemy')

  useTick((delta) => {
    if (gameStatus === 'playing') move(id, delta)
  })

  return (
    <Sprite
      image={enemySrc}
      x={enemyX}
      y={enemyY}
      width={32}
      height={32}
      anchor={{ x: 0.5, y: 0.5 }}
    />
  )
}

export default Enemy
