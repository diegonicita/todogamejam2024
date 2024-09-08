'use client'
import { useEffect, useState } from 'react'
import { generateSlug } from 'random-word-slugs'

export const useCreateImage = () => {
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined)
  const [slug, setSlug] = useState<string | undefined>(undefined)
  const [forceUpdate, setForceUpdate] = useState(0)

  const _slug = generateSlug(4, { format: 'title' })

  const sleep = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = process.env.NEXT_PUBLIC_API_LOCAL
        const res1 = await fetch(`${url}/api/create`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ slug: _slug }),
        })

        const data1 = await res1.json()
        console.log(data1)
        const id = data1.result
        // console.log(id)
        setSlug(_slug)
        await sleep(5000)

        const res2 = await fetch(`${url}/api/image/${id}`, {
          cache: 'no-store',
        })
        const data2 = await res2.json()
        console.log(data2)
        setImageUrl(data2.result.assets[0].url)
        // setImageUrl(
        //   'https://dev.gaxoslabs.ai/api/connect/v1/download/9bdabd17-6b72-439b-8ac8-cba2dd1c2f85',
        // )
        //updateSrc(data2.result.assets[0].url)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [forceUpdate])

  return {
    imageUrl,
    setImageUrl,
    slug: slug ? slug : 'Flaky Wooden Thankful Lion',
    setForceUpdate,
    forceUpdate,
  }
}
