/* eslint-disable @next/next/no-img-element */
'use client'
import { Container, useApp } from '@pixi/react'
import React, { useEffect } from 'react'
import useStore from '@/app/store/useStore'

const useTakeScreenShot = () => {
  const { score, setImageDataUrl } = useStore()
  const app = useApp()
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const getImage = async () => {
      const renderer = app.renderer
      const r = await renderer.extract.base64()
      setImageDataUrl(r)
    }
    getImage()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [score])
}

const Screenshot = () => {
  useTakeScreenShot()
  return null
}

export default Screenshot
