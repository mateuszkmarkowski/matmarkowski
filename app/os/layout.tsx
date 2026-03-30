import type { Metadata } from 'next'
import './dojo.css'

export const metadata: Metadata = {
  title: 'Mateusz OS',
  description: 'The only way is through.',
  robots: { index: false, follow: false },
}

export default function OsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
