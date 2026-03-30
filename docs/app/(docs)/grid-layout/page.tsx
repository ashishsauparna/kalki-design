import type { Metadata } from 'next'
import { GridLayoutShowcase } from './showcase'
import { DocsWithToc } from '@/app/components/docs-with-toc'

export const metadata: Metadata = {
  title: 'Grid & Layout - Kalki Design System',
  description: 'Responsive grid and layout structure for desktop, tablet, and mobile.',
}

const sectionLinks = [
  { id: 'overview', label: 'Overview' },
  { id: 'responsive-grid', label: 'Responsive Grid' },
]

export default function GridLayoutPage() {
  return (
    <DocsWithToc links={sectionLinks}>
      <section id="overview" className="scroll-mt-24">
        <h1 className="text-[20px] font-semibold text-[#161616] dark:text-foreground">Grid &amp; Layout</h1>
        <p className="mt-2 text-[14px] text-[#535353] dark:text-muted-foreground">
          Use the responsive grid structure below to keep layouts consistent across desktop, tablet, and mobile.
        </p>
      </section>
      <section id="responsive-grid" className="scroll-mt-24 space-y-3 border-t border-border pt-6">
        <h2 className="text-[16px] font-semibold text-[#161616] dark:text-foreground">Responsive Grid</h2>
        <GridLayoutShowcase />
      </section>
    </DocsWithToc>
  )
}
