import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="backgroundImage">
      <body className={inter.className}>
        <div className="navbar bg-primary text-primary-content justify-center">
          <div className="text-3xl">
            Fuera de Control (Nick3d)
          </div>
        </div>
        {children}
      </body>
    </html>
  )
}
