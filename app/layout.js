import { Space_Grotesk } from 'next/font/google'
import './globals.css'
import { Toaster } from '@/components/ui/sonner'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-space-grotesk',
})

export const metadata = {
  title: 'Ayush Bijalwan — Video Editor · Motion Graphics · 3D Artist',
  description: 'Cinematic video edits, motion graphics and immersive 3D visuals that help brands, creators, and businesses tell unforgettable stories.',
  keywords: ['video editor', 'motion graphics', '3D artist', 'Ayush Bijalwan', 'portfolio', 'cinematic', 'VFX', 'Blender', 'After Effects'],
  authors: [{ name: 'Ayush Bijalwan' }],
  openGraph: {
    title: 'Ayush Bijalwan — Video Editor · Motion Graphics · 3D Artist',
    description: 'Cinematic edits, motion graphics and immersive 3D visuals.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ayush Bijalwan — Portfolio',
    description: 'Cinematic edits, motion graphics and immersive 3D visuals.',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`dark ${spaceGrotesk.variable}`} suppressHydrationWarning>
      <body className="bg-[#0A0A0A] text-white antialiased font-sans overflow-x-hidden">
        {children}
        <Toaster theme="dark" position="bottom-right" />
      </body>
    </html>
  )
}
