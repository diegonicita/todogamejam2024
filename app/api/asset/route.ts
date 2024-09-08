import type { NextRequest } from 'next/server'
import { headers } from 'next/headers'

export async function GET(request: NextRequest) {
  const baseURL = process.env.API_URL
  const apiKey = process.env.API_KEY
  const apiId = process.env.API_ID

  const url = `${baseURL}/v1/asset`

  const imageRequest = {
    data: {
      project_id: '0191af65-b6c1-72a6-96e2-db5ce17331dc',
    },
    generator: 'stability-text-to-image',
    generator_parameters: {
      text_prompts: [
        {
          text: 'A futuristic car with vibrant neon lights, flying cars, and a cyberpunk theme',
          weight: 1.0, // Peso de la importancia del prompt
        },
      ],
      engine_id: "stable-diffusion-v1-6",
      cfg_scale: 7, // Cuánto sigue el modelo el prompt vs. la creatividad
      steps: 50, // Número de pasos de denoising (más pasos = más calidad, pero más lento)
      sampler: 'DDIM', // Algoritmo de muestreo como "k_euler", "k_lms", etc.
      seed: 42, // Semilla fija para reproducibilidad
      width: 512, // Ancho de la imagen en píxeles
      height: 512, // Alto de la imagen en píxeles
      samples: 1, // Número de imágenes a generar
      style_preset: 'digital-art', // Preset de estilo si se soporta en la API
      upscale: false, // Si deseas escalar la imagen resultante (opcional)
    },
    options: {
      description:
        'Generate an image based on the prompt with a futuristic and vibrant theme.',
    },
  }

  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    // body: JSON.stringify(imageRequest),
    method: 'GET',
  })

  // const response = await fetch(url, {
  //   headers: {
  //     'Content-Type': 'application/json',
  //     Authorization: `Bearer ${apiKey}`,
  //   },
  //   method: 'GET',
  // })

  const result = await response.json()

  return Response.json({ status: 200, success: true, result: result })
}