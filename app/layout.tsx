import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Mat Markowski',
  description: 'This is where the dream begins. A space to explore consciousness, study the edge of science, and push limits.',
  openGraph: {
    title: 'Mat Markowski',
    description: 'This is where the dream begins.',
    url: 'https://matmarkowski.com',
    siteName: 'Mat Markowski',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=EB+Garamond:ital,wght@0,400;0,500;1,400&family=Inter:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
