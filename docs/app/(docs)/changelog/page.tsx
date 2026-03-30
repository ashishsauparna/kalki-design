import type { Metadata } from 'next'
import { DocsWithToc } from '@/app/components/docs-with-toc'

export const metadata: Metadata = {
  title: 'Changelog - Kalki Design',
  description: 'Latest updates and releases for Kalki Design System',
}

const sectionLinks = [
  { id: 'overview', label: 'Overview' },
  { id: 'latest-release', label: 'Latest Release' },
]

export default function ChangelogPage() {
  return (
    <DocsWithToc links={sectionLinks} contentClassName="max-w-3xl space-y-10">
      <section id="overview" className="scroll-mt-24">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Changelog</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Latest updates and releases to the Kalki Design component system.
        </p>
      </section>

      <section id="latest-release" className="scroll-mt-24 space-y-8 border-l-2 border-border pl-6 relative border-t border-border pt-6">
        <div className="relative">
          <div className="absolute -left-[1.95rem] mt-1.5 h-3 w-3 rounded-full border-2 border-primary bg-background" />
          <h2 className="text-xl font-semibold tracking-tight">v1.0.0 — Initial Release</h2>
          <p className="text-sm text-muted-foreground mt-1">March 19, 2026</p>
          <div className="mt-4 prose prose-neutral dark:prose-invert">
            <p>Welcome to Kalki Design System v1.0.0! A complete rewrite leveraging modern Tailwind v4 features. The package is now a unified single export, natively typed, and deeply integrated with React Server Components.</p>
            
            <h3 className="text-sm font-semibold mt-6 mb-2 text-foreground">Core Components Added:</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li><strong>Button</strong>: 6 variants (primary, secondary, outline, ghost, destructive, link) and 4 sizes with icon support.</li>
              <li><strong>Input</strong>: Clearable text input with left/right semantic icons.</li>
              <li><strong>Card</strong>: Composable layout boxes with hover states.</li>
            </ul>

            <h3 className="text-sm font-semibold mt-6 mb-2 text-foreground">Form Controls Added:</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li><strong>Textarea</strong>: Auto-resizing textarea bound by min and max heights.</li>
              <li><strong>Checkbox & Radio</strong>: Native, accessible, and fully animated custom inputs using `peer` class mechanics.</li>
              <li><strong>Switch</strong>: An animated toggle button conforming to `role="switch"`.</li>
              <li><strong>Select</strong>: Themed native HTML dropdown select.</li>
            </ul>

            <h3 className="text-sm font-semibold mt-6 mb-2 text-foreground">Overlays Added:</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li><strong>Dialog</strong>: Accessible modal overlaid on the page with Esc-key dismissal and focus trapping.</li>
              <li><strong>Toast</strong>: Context-API-powered stackable notifications.</li>
            </ul>
          </div>
        </div>
      </section>
    </DocsWithToc>
  )
}
