import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Hacker Taboo - Taboo for hackers - Happy Hacking Space',
  description: 'Hacker Taboo is taboo for hackers',
  generator: 'happyhacking.space',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
