import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import { Sidebar } from '@/app/components/sidebar'
import { MobileNav } from '@/app/components/mobile-nav'
import { CommandPalette } from '@/app/components/command-palette'
import { ThemeToggle } from '@/components/theme-toggle'
import { ToastProvider, Toaster } from 'kalki-design'
import './globals.css'

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
})

export const metadata: Metadata = {
  title: 'Kalki Design System',
  description: 'A Tailwind v4-based component library with a beautiful docs site',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          storageKey="kalki-theme"
        >
          <ToastProvider>
            <CommandPalette />
            <div className="flex min-h-screen">
              <Sidebar />
              <div className="flex-1 flex flex-col min-w-0">
                {/* Mobile top bar — visible only on small screens */}
                <header className="sticky top-0 z-40 flex h-14 items-center gap-4 border-b border-border bg-background px-4 lg:hidden">
                  <MobileNav />
                  <span className="font-semibold text-sm">Kalki Design</span>
                  <div className="ml-auto">
                    <ThemeToggle />
                  </div>
                </header>

                <main className="flex-1 px-6 py-8 lg:px-10 lg:py-10 max-w-4xl">
                  {children}
                </main>
              </div>
            </div>
            <Toaster position="bottom-right" />
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
