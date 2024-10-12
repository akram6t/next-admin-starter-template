// import './globals.css'
import type { Metadata } from 'next'
// import { ThemeProvider } from "@/components/theme-provider"
import Sidebar from '@/components/Sidebar'
import { Navbar } from '@/components/Navbar'
// import ClientSessionProvider from '@/components/ClientSessionProvider'


export const metadata: Metadata = {
  title: 'Admin Panel',
  description: 'A beautiful and functional admin panel',
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 p-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}