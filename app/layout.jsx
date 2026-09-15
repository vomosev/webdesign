import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Clean Lines Design Studio',
  description: 'Modern web design with a focus on clean lines, minimalism, and timeless aesthetics. We create beautiful digital experiences that stand the test of time.',
  keywords: 'web design, clean lines, minimalism, modern design, user experience, UI/UX',
  authors: [{ name: 'Clean Lines Design Studio' }],
  openGraph: {
    title: 'Clean Lines Design Studio',
    description: 'Modern web design with a focus on clean lines and minimalism',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <div className="site-wrapper">
          <Header />
          <main className="main-content">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}