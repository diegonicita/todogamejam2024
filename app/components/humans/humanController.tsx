import React from 'react'
import Human from './human'
import useStore from '@/app/store/useStoreHumans'

const HumanController = () => {
  const { humans } = useStore()

  return (
    <>
      {/* biome-ignore lint/suspicious/noExplicitAny: <explanation> */}
      {humans.map((e: any, index: number) => (
        <Human key={index.toString()} id={index} />
      ))}
    </>
  )
}

export default HumanController
