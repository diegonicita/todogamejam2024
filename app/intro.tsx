/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
'use client'
import useMounted from './hooks/useMounted'
import useStore from '@/app/store/useStore'
import dynamic from 'next/dynamic'
import Keyboard from './components/keyboard/keyboard'

const Music = dynamic(() => import('./components/music/music'))

export default function Game({
  imageUrl,
  slug,
  setImageUrl,
  setForceUpdate,
  forceUpdate,
}: {
  imageUrl: string
  slug: string
  setImageUrl: (url: string) => void
  setForceUpdate: () => void
  forceUpdate: number
}) {
  const { isMounted } = useMounted()
  const { screenHeight, screenWidth, setGameStatus, gameStatus } = useStore()

  const handlePlay = () => {
    if (gameStatus === 'waiting') setGameStatus('playing')
  }

  const handleFetchNewWorld = () => {
    setImageUrl(undefined)
    setForceUpdate(forceUpdate + 1)
  }

  return (
    <div className="flex justity-center text-base-content text-lg">
      {isMounted && gameStatus === 'waiting' && (
        <div className="flex flex-wrap justify-center w-full mt-10 mb-10">
          <div>
            <div>
              {imageUrl && (
                <div className="p-4">
                  <img
                    className="h-full rounded shadow-2xl"
                    src={imageUrl}
                    width={300}
                    height={300}
                    alt="IA created"
                  />
                </div>
              )}
            </div>
            <div className="flex flex-col">
              <>
                {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
                <div
                  className="btn mt-4 btn-primary text-primary-content"
                  onClick={handlePlay}
                >
                  Ir a:{' '}
                  <span className="font-bold text-secondary-content">
                    {slug}
                  </span>
                </div>
                {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
                <div
                  className="btn mt-4 btn-primary text-primary-content"
                  onClick={handleFetchNewWorld}
                >
                  Explorar un Nuevo Mundo
                </div>
              </>

              {/* <div className="btn mt-4"> Creditos </div> */}
            </div>
          </div>
          <div className="flex flex-col max-w-lg">
            {/*  <div className="mt-4 font-bold text-xl">Breaking News</div>
            <div className="text-lg">We've just arrived on a new planet!</div>
            <div className="text-lg">Welcome to Planet {slug}</div>
            <div className="max-w-prose text-balance">
              <div className="mt-4  font-bold"> English Tutorial</div>
              <div>Use the W, A, S, D keys to move your character.</div>
              <div>Rescue the stranded aliens across the map.</div>
              <div>
                You control a yellow, mutant humanoid bird superhero with
                special powers.
              </div>
              <div>
                Avoid or destroy the enemy UFOs to complete your mission.
              </div>
            </div> */}
            <div className="mt-4 font-bold text-xl">Últimas Noticias</div>
            <div className="text-lg">
              ¡Acabamos de llegar a un nuevo planeta!
            </div>
            <div className="text-lg">Bienvenido al Planeta {slug}</div>
            <div className="max-w-prose text-balance">
              <div className="mt-4  font-bold"> Tutorial en Español </div>
              <div>
                Miles de extraterrestres estan volando por el espacio fuera de control
              <span className="font-bold"> ¡Rescatalos!</span>
              </div>
              <div>
                Eres un heroe alado: si te aproximas a ellos sumas puntos
                mientras los rescatas.
              </div>
              <div>
                Evita a los malvados alienigenas con ovnis (enemigos) para
                completar tu misión.
              </div>
              <div>Usa las teclas W, A, S, D para mover a tu personaje.</div>
              <Keyboard />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
