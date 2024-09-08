'use client'
import Game from './game'
import Intro from './intro'
import { useCreateImage } from './hooks/useCreateImage'

export default function Home() {
  const { imageUrl, setImageUrl, forceUpdate, setForceUpdate, slug } =
    useCreateImage()

  return (
    <main className="m-8 text-center">
      {imageUrl && (
        <Intro
          forceUpdate={forceUpdate}
          setForceUpdate={setForceUpdate}
          setImageUrl={setImageUrl}
          imageUrl={imageUrl}
          slug={slug}
        />
      )}
      {imageUrl && <Game imageUrl={imageUrl} />}
      {!imageUrl && (
        <div className="flex items-center justify-center gap-12 py-10">
          <div className="flex flex-col gap-6">
            <div className="flex items-center">
              <div className="skeleton h-80 w-96 shrink-0" />
            </div>
            <div className="skeleton h-12 w-96" />
          </div>
          <div className="flex flex-col gap-6">
            <div className="skeleton h-12 w-96" />
            <div className="skeleton h-12 w-96" />
            <div className="skeleton h-12 w-96" />
            <div className="skeleton h-12 w-96" />
            <div className="skeleton h-40 w-96" />
          </div>
        </div>
      )}
    </main>
  )
}
