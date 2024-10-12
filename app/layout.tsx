import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from "@/components/theme-provider"
import Sidebar from '@/components/Sidebar'
import { Navbar } from '@/components/Navbar'
import ClientSessionProvider from '@/components/ClientSessionProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Admin Panel',
  description: 'A beautiful and functional admin panel',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ClientSessionProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="flex flex-col h-screen">
              <Navbar />
              <div className="flex flex-1 overflow-hidden">
                <Sidebar />
                <main className="flex-1 p-8 overflow-auto">
                  {children}
                </main>
              </div>
            </div>
          </ThemeProvider>
        </ClientSessionProvider>
      </body>
    </html>
  )
}