import { useEffect, useState } from 'react'

export const useCreateImage = () => {
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined)
  const [slug, setSlug] = useState<string | undefined>(undefined)
  const [forceUpdate, setForceUpdate] = useState(0)

  const sleep = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const fetchData = async () => {
      try {
        //   const res1 = await fetch('http://localhost:3000/api/create')
        //   const data1 = await res1.json()
        //   console.log(data1)
        //   const id = data1.result
        //   console.log(id)
        //   setSlug(data1.slug)
        //   await sleep(5000)

        //   const res2 = await fetch(`http://localhost:3000/api/image/${id}`)
        //   const data2 = await res2.json()
        //   console.log(data2)
        //   setImageUrl(data2.result.assets[0].url)
        setImageUrl(
          'https://dev.gaxoslabs.ai/api/connect/v1/download/9bdabd17-6b72-439b-8ac8-cba2dd1c2f85',
        )
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
