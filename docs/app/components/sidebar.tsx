'use client'

import { componentRegistry, CATEGORIES } from '@/lib/component-registry'
import { SidebarLink } from './sidebar-link'
import { ThemeToggle } from '@/components/theme-toggle'

export function Sidebar() {
  return (
    <aside className="hidden lg:flex lg:flex-col w-64 h-screen sticky top-0 border-r border-border bg-background overflow-y-auto shrink-0">
      <div className="flex items-center justify-between px-4 py-4 border-b border-border">
        <SidebarLink href="/" className="font-semibold text-foreground text-base px-0 py-0 hover:bg-transparent hover:text-foreground">
          Kalki Design
        </SidebarLink>
        <ThemeToggle />
      </div>

      {/* Cmd+K search hint */}
      <div className="px-3 pt-3 pb-1">
        <button
          type="button"
          onClick={() => {
            // Dispatch a synthetic Cmd+K event so CommandPalette's global listener picks it up
            document.dispatchEvent(
              new KeyboardEvent('keydown', { key: 'k', metaKey: true, bubbles: true })
            )
          }}
          className="w-full flex items-center justify-between rounded-md border border-border bg-muted/40 px-3 py-2 text-xs text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
          aria-label="Open command palette (Cmd+K)"
        >
          <span>Search components...</span>
          <kbd className="rounded border border-border bg-background px-1.5 py-0.5 text-xs font-mono">
            ⌘K
          </kbd>
        </button>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-6">
        <div>
          <SidebarLink href="/getting-started">
            Getting Started
          </SidebarLink>
        </div>

        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 py-2">
            Guidelines
          </p>
          <div className="space-y-1">
            <SidebarLink href="/changelog">Changelog</SidebarLink>
            <SidebarLink href="/colors">Colors</SidebarLink>
            <SidebarLink href="/typography">Typography</SidebarLink>
          </div>
        </div>

        {CATEGORIES.map((category) => {
          const components = componentRegistry.filter(
            (c) => c.category === category
          )

          if (components.length === 0) return null

          return (
            <div key={category}>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 py-2">
                {category}
              </p>
              <div className="space-y-1">
                {components.map((component) => (
                  <SidebarLink
                    key={component.slug}
                    href={`/components/${component.slug}`}
                  >
                    {component.name}
                  </SidebarLink>
                ))}
              </div>
            </div>
          )
        })}
      </nav>
    </aside>
  )
}
