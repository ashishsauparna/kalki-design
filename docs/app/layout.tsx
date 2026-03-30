import type { Metadata } from 'next'
import { ThemeProvider } from 'next-themes'
import { CommandPalette } from '@/app/components/command-palette'
import { Sidebar } from '@/app/components/sidebar'
import { ToastProvider, Toaster } from 'kalki-design'
import './globals.css'

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
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans text-sm antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          storageKey="kalki-theme"
        >
          <ToastProvider>
            <div className="flex h-screen overflow-hidden bg-background font-sans antialiased">
              <CommandPalette />
              <Sidebar />
              <div id="docs-scroll-container" className="flex-1 overflow-y-auto">
                {children}
              </div>
              <Toaster position="bottom-right" />
            </div>
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
