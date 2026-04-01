'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { HouseLine, CaretRight, GithubLogo } from '@phosphor-icons/react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { componentRegistry } from '@/lib/component-registry'

function ThemeIcon() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => setMounted(true), [])
  if (!mounted) return <span className="size-4" />

  const isDark = theme === 'dark'

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      className="flex items-center justify-center size-[32px] rounded-[8px] text-[#535353] hover:bg-[#f3f3f3] transition-colors"
    >
      {isDark ? (
        /* Sun */
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
        </svg>
      ) : (
        /* Half-circle / moon */
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
        </svg>
      )}
    </button>
  )
}

function buildBreadcrumbs(pathname: string): { label: string; href: string }[] {
  const crumbs: { label: string; href: string }[] = [{ label: 'Home', href: '/about-kalki' }]
  const segments = pathname.split('/').filter(Boolean)

  segments.forEach((seg, i) => {
    const href = '/' + segments.slice(0, i + 1).join('/')

    if (seg === 'components') {
      crumbs.push({ label: 'Components', href: '/components/button' })
      return
    }

    // Check if it's a component slug
    const comp = componentRegistry.find((c) => c.slug === seg)
    if (comp) {
      crumbs.push({ label: comp.name, href })
      return
    }

    // Humanise the segment
    const label = seg
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (c) => c.toUpperCase())
    crumbs.push({ label, href })
  })

  return crumbs
}

export function DocsHeader() {
  const pathname = usePathname() ?? '/'
  const crumbs = buildBreadcrumbs(pathname)

  return (
    <header className="hidden md:flex items-center justify-between pt-[40px] shrink-0 w-full">
      {/* Breadcrumb */}
      <nav className="flex min-w-0 items-center gap-[4px]" aria-label="Breadcrumb">
        {crumbs.map((crumb, i) => {
          const isLast = i === crumbs.length - 1
          const isFirst = i === 0

          return (
            <span key={i} className="flex items-center gap-[4px]">
              {i > 0 && (
                <CaretRight size={10} className="text-[#535353] shrink-0" />
              )}
              {isFirst ? (
                <Link href={crumb.href} aria-label="Home" className="flex items-center text-[#535353] hover:text-[#161616] transition-colors">
                  <HouseLine size={16} />
                </Link>
              ) : isLast ? (
                <span className="text-[14px] font-medium text-[#161616] whitespace-nowrap truncate max-w-[220px] lg:max-w-none">
                  {crumb.label}
                </span>
              ) : (
                <Link href={crumb.href} className="text-[14px] font-medium text-[#535353] hover:text-[#161616] whitespace-nowrap transition-colors truncate max-w-[180px] lg:max-w-none">
                  {crumb.label}
                </Link>
              )}
            </span>
          )
        })}
      </nav>

      {/* Actions */}
      <div className="flex items-center gap-[12px] lg:gap-[16px]">
        <Link
          href="https://github.com/kalki-design/kalki-design"
          target="_blank"
          rel="noreferrer"
          className="hidden lg:flex items-center gap-[4px] text-[14px] font-medium text-[#161616] hover:text-[#535353] transition-colors"
        >
          <GithubLogo size={16} />
          <span>Git Repository</span>
        </Link>
        <ThemeIcon />
      </div>
    </header>
  )
}
