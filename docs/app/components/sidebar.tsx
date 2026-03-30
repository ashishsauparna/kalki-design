'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import {
  Info,
  Lightning,
  DownloadSimple,
  Feather,
  Clock,
  BookOpen,
  DiamondsFour,
  MagnifyingGlass,
  TextT,
  CheckCircle,
  User,
  ListDashes,
  CaretRight,
  Cursor,
  IdentificationCard,
  CheckSquare,
  CalendarBlank,
  CaretDown,
  CloudArrowUp,
  PictureInPicture,
  ToggleLeft,
  RadioButton,
  Table,
  Rows,
  SlidersHorizontal,
  Circle,
  ArrowsOutLineHorizontal,
  Spinner,
  Bell,
  Question,
  GridFour,
  Gauge,
  Palette,
} from '@phosphor-icons/react'
import { componentRegistry } from '@/lib/component-registry'

type NavIcon = React.ComponentType<{ size?: number; className?: string }>

interface NavItemProps {
  href: string
  label: string
  icon: NavIcon
}

function NavItem({ href, label, icon: Icon }: NavItemProps) {
  const pathname = usePathname()
  const isActive =
    href !== '#' &&
    (pathname === href || (href !== '/' && pathname?.startsWith(href)))

  return (
    <Link
      href={href}
      className={`flex items-center gap-[6px] h-[31px] px-[14px] rounded-[8px] text-[13px] transition-colors ${
        isActive
          ? 'bg-[#f3f3f3] text-[#161616] font-medium'
          : 'text-[#4e4e4e] hover:bg-[#f5f5f5] hover:text-[#161616]'
      }`}
    >
      <Icon size={14} className="shrink-0" />
      <span className="whitespace-nowrap">{label}</span>
    </Link>
  )
}

const componentIconMap: Record<string, NavIcon> = {
  accordion:  ListDashes,
  avatar:     User,
  breadcrumbs: CaretRight,
  button:     Cursor,
  card:       IdentificationCard,
  checkbox:   CheckSquare,
  datepicker: CalendarBlank,
  dialog:     PictureInPicture,
  dropzone:   CloudArrowUp,
  input:      TextT,
  pagination: ArrowsOutLineHorizontal,
  progress:   Gauge,
  radio:      RadioButton,
  select:     CaretDown,
  skeleton:   Spinner,
  slider:     SlidersHorizontal,
  switch:     ToggleLeft,
  table:      Table,
  tabs:       Rows,
  textarea:   GridFour,
  toast:      Bell,
  tooltip:    Question,
}

export function Sidebar() {
  const components = [...componentRegistry].sort((a, b) =>
    a.name.localeCompare(b.name)
  )

  return (
    <aside className="flex flex-col w-[280px] shrink-0 h-screen bg-white border-r border-[#dcdcdc] overflow-y-auto hide-scrollbar">
      {/* Search */}
      <div className="px-[18px] pt-[16px] pb-[16px]">
        <button
          type="button"
          onClick={() => {
            document.dispatchEvent(
              new KeyboardEvent('keydown', { key: 'k', metaKey: true, bubbles: true })
            )
          }}
          className="w-full flex items-center justify-between h-[32px] px-[12px] rounded-[8px] border border-[#dcdcdc] bg-white hover:bg-[#f5f5f5] transition-colors"
          aria-label="Open command palette (⌘K)"
        >
          <div className="flex items-center gap-[4px]">
            <MagnifyingGlass size={14} className="text-black" />
            <span className="text-[13px] text-black font-['Geist',sans-serif]">Search</span>
          </div>
          <div className="flex items-center gap-[2px] bg-[#f5f5f5] px-[6px] py-[2px] rounded-[4px]">
            <span className="text-[10px] text-black">⌘</span>
            <span className="text-[10px] text-black">K</span>
          </div>
        </button>
      </div>

      {/* General nav */}
      <nav className="flex flex-col gap-[6px] px-[18px]">
        <NavItem href="/about-kalki" label="About Kalki Design" icon={Info} />
        <NavItem href="/getting-started" label="Getting Started" icon={Lightning} />
        <NavItem href="/resources" label="Resources" icon={DownloadSimple} />
        <NavItem href="/theme" label="Theme" icon={Palette} />
        <NavItem href="#" label="Iconography" icon={Feather} />
        <NavItem href="/changelog" label="Changelog" icon={Clock} />
      </nav>

      {/* Divider */}
      <div className="mx-[18px] my-[20px] border-t border-[#dcdcdc]" />

      {/* Guidelines */}
      <div className="flex flex-col gap-[12px] px-[18px]">
        <div className="flex items-center gap-[4px] pl-[14px]">
          <BookOpen size={14} className="text-black" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.2px] text-black">
            Guidelines
          </span>
        </div>
        <div className="flex flex-col gap-[6px]">
          <NavItem href="/grid-layout" label="Grid & Layout" icon={GridFour} />
          <NavItem href="/typography" label="Typography" icon={TextT} />
          <NavItem href="/colors" label="Color" icon={Circle} />
          <NavItem href="/validation" label="Validation" icon={CheckCircle} />
          <NavItem href="/accessibility" label="Accessibility" icon={User} />
        </div>
      </div>

      {/* Divider */}
      <div className="mx-[18px] my-[20px] border-t border-[#dcdcdc]" />

      {/* Components */}
      <div className="flex flex-col gap-[12px] px-[18px] pb-[24px]">
        <div className="flex items-center gap-[4px] pl-[14px]">
          <DiamondsFour size={14} className="text-black" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.2px] text-black">
            Components
          </span>
        </div>
        <div className="flex flex-col gap-[6px]">
          {components.map((component) => {
            const Icon = componentIconMap[component.slug] ?? SlidersHorizontal
            return (
              <NavItem
                key={component.slug}
                href={`/components/${component.slug}`}
                label={component.name}
                icon={Icon}
              />
            )
          })}
        </div>
      </div>
    </aside>
  )
}
