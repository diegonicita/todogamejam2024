import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const baseURL = process.env.API_URL
  const apiKey = process.env.API_KEY
  const apiId = process.env.API_ID
  const { id } = params

  if (!id) {
    return NextResponse.json({
      status: 400,
      success: false,
      message: 'Missing id parameter',
    })
  }

  const url = `${baseURL}/v1/request/${id}`

  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    method: 'GET',
  })

  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      method: 'GET',
    })

    if (!response.ok) {
      return NextResponse.json({
        status: response.status,
        success: false,
        message: 'Failed to fetch data from API',
      })
    }

    const result = await response.json()

    return NextResponse.json({ status: 200, success: true, result })
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  } catch (error: any) {
    return NextResponse.json({
      status: 500,
      success: false,
      message: 'Internal server error',
      error: error.message,
    })
  }
}
