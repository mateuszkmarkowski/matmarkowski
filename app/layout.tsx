import type { Metadata } from 'next'
import './globals.css'
import Nav from '@/components/site/Nav'
import Footer from '@/components/site/Footer'

export const metadata: Metadata = {
  title: { default: 'Mat Markowski', template: '%s · Mat Markowski' },
  description: 'The best lucid dreaming hub on the internet. Learn to wake up inside your dreams.',
  openGraph: {
    title: 'Mat Markowski',
    description: 'The best lucid dreaming hub on the internet.',
    url: 'https://matmarkowski.com',
    siteName: 'Mat Markowski',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=EB+Garamond:ital,wght@0,400;0,500;1,400&family=Inter:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  )
}
