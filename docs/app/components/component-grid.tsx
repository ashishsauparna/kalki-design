'use client'

import { useState } from 'react'
import Link from 'next/link'
import { componentRegistry } from '@/lib/component-registry'
import { cn } from 'kalki-design'

export function ComponentGrid() {
  const [query, setQuery] = useState('')

  const filtered = componentRegistry.filter((comp) => {
    if (!query) return true
    const q = query.toLowerCase()
    return (
      comp.name.toLowerCase().includes(q) ||
      comp.description.toLowerCase().includes(q)
    )
  })

  return (
    <div>
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search components..."
        className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring mb-6"
      />

      {filtered.length === 0 ? (
        <p className="text-muted-foreground text-sm text-center py-12">
          No components match &ldquo;{query}&rdquo;.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((comp) => (
            <Link
              key={comp.slug}
              href={`/components/${comp.slug}`}
              className={cn(
                'group rounded-lg border border-border bg-card p-5 transition-all',
                'hover:border-primary/50 hover:shadow-md',
              )}
            >
              <h3 className="font-semibold text-card-foreground group-hover:text-primary transition-colors">
                {comp.name}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                {comp.description}
              </p>
              <span className="mt-3 inline-block text-xs text-muted-foreground bg-muted rounded-full px-2 py-0.5">
                {comp.category}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
