import { DocsHeader } from '@/app/components/docs-header'
import { MobileNav } from '@/app/components/mobile-nav'

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col min-h-full w-full">
      <div className="md:hidden px-4 py-3 border-b border-[#dcdcdc] flex items-center gap-4">
        <MobileNav />
        <span className="font-medium text-sm">Documentation</span>
      </div>
      <div className="flex-1 w-full max-w-[860px] mx-auto px-8 flex flex-col">
        <DocsHeader />
        <main className="flex-1 pt-[53px] pb-10">
          {children}
        </main>
      </div>
    </div>
  )
}
