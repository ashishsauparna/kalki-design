'use client'

import { useState } from 'react'
import { Tabs, TabPanel } from 'kalki-design'

type ViewportKey = 'desktop' | 'tablet' | 'mobile'

type GridPreset = {
  id: ViewportKey
  label: string
  description: string
  columns: number
  gutter: number
  margins: number
  maxWidth: string
  referenceSize: string
  frameClassName: string
  viewportHeight: number
}

const GRID_PRESETS: GridPreset[] = [
  {
    id: 'desktop',
    label: 'Desktop',
    description: 'Primary layout for large screens with a 12-column grid.',
    columns: 12,
    gutter: 24,
    margins: 80,
    maxWidth: '1200px',
    referenceSize: '1440 x 900',
    frameClassName: 'w-full max-w-[760px]',
    viewportHeight: 190,
  },
  {
    id: 'tablet',
    label: 'Tablet',
    description: 'Balanced 8-column grid optimized for medium-width layouts.',
    columns: 8,
    gutter: 20,
    margins: 32,
    maxWidth: '100%',
    referenceSize: '834 x 1112',
    frameClassName: 'w-[74%] min-w-[360px] max-w-[560px]',
    viewportHeight: 210,
  },
  {
    id: 'mobile',
    label: 'Mobile',
    description: 'Compact 4-column grid for thumb-friendly vertical flows.',
    columns: 4,
    gutter: 16,
    margins: 16,
    maxWidth: '100%',
    referenceSize: '390 x 844',
    frameClassName: 'w-[44%] min-w-[240px] max-w-[320px]',
    viewportHeight: 260,
  },
]

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[8px] border border-border bg-background px-3 py-2">
      <p className="text-[11px] uppercase tracking-[0.2px] text-muted-foreground">{label}</p>
      <p className="mt-1 text-[14px] font-medium text-foreground">{value}</p>
    </div>
  )
}

function LayoutStructure({ preset }: { preset: GridPreset }) {
  const id = preset.id
  const mainAreaClass =
    id === 'mobile' ? 'grid-cols-1' : id === 'tablet' ? 'grid-cols-[2fr_1fr]' : 'grid-cols-[3fr_1fr]'

  return (
    <div className="rounded-[10px] border border-border bg-background p-4">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-[14px] font-medium text-foreground">Layout Structure</p>
        <p className="text-[12px] text-muted-foreground">{preset.referenceSize}</p>
      </div>
      <div className="rounded-[8px] border border-dashed border-border bg-muted/20 p-3">
        <div className="flex justify-center">
          <div className={`rounded-[14px] border border-border bg-background/90 p-2 shadow-sm ${preset.frameClassName}`}>
            <div className="space-y-2" style={{ minHeight: `${preset.viewportHeight}px` }}>
              <div className="h-9 rounded-[8px] border border-border bg-muted/30 px-3 py-2 text-[12px] text-muted-foreground">
                Header / Navigation
              </div>
              <div className={`grid gap-2 ${mainAreaClass}`}>
                <div className="min-h-[120px] rounded-[8px] border border-border bg-muted/20 px-3 py-2 text-[12px] text-muted-foreground">
                  Main Content
                </div>
                {id !== 'mobile' && (
                  <div className="min-h-[120px] rounded-[8px] border border-border bg-muted/30 px-3 py-2 text-[12px] text-muted-foreground">
                    Secondary Rail
                  </div>
                )}
              </div>
              <div className="h-9 rounded-[8px] border border-border bg-muted/30 px-3 py-2 text-[12px] text-muted-foreground">
                Footer
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function GridPreview({ preset }: { preset: GridPreset }) {
  const isDesktop = preset.id === 'desktop'
  const marginInline =
    isDesktop
      ? 'clamp(8px, 2vw, 20px)'
      : `${preset.margins}px`

  const columnGap =
    isDesktop
      ? 'clamp(4px, 0.9vw, 8px)'
      : `${preset.gutter}px`

  return (
    <div className="rounded-[10px] border border-border bg-background p-4">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-[14px] font-medium text-foreground">Grid Preview</p>
        <p className="text-[12px] text-muted-foreground">
          {preset.columns} columns • {preset.referenceSize}
        </p>
      </div>
      <div className="rounded-[8px] border border-dashed border-border bg-muted/20 p-3">
        <div className="flex justify-center">
          <div className={`rounded-[14px] border border-border bg-background/90 p-2 shadow-sm ${preset.frameClassName}`}>
          <div
            className="grid rounded-[8px] py-2"
            style={{
              height: `${preset.viewportHeight}px`,
              paddingInline: marginInline,
              gridTemplateColumns: `repeat(${preset.columns}, minmax(0, 1fr))`,
              columnGap,
            }}
          >
            {Array.from({ length: preset.columns }).map((_, idx) => (
              <div key={`${preset.id}-${idx}`} className="rounded-[4px] border border-primary/20 bg-primary/10" />
            ))}
          </div>
        </div>
        </div>
      </div>
      {isDesktop && (
        <p className="mt-2 text-[11px] text-muted-foreground">
          Desktop preview uses adjusted spacing for readability in docs while keeping all 12 columns visible.
        </p>
      )}
    </div>
  )
}

export function GridLayoutShowcase() {
  const [activeTab, setActiveTab] = useState<ViewportKey>('desktop')

  return (
    <div className="space-y-4">
      <Tabs
        tabs={GRID_PRESETS.map((preset) => ({ id: preset.id, label: preset.label }))}
        activeTab={activeTab}
        onChange={(id) => setActiveTab(id as ViewportKey)}
        variant="pills"
      />

      {GRID_PRESETS.map((preset) => (
        <TabPanel key={preset.id} activeTab={activeTab} tabId={preset.id} className="pt-0">
          <div className="space-y-4">
            <div className="rounded-[10px] border border-border bg-background p-4">
              <p className="text-[14px] font-medium text-foreground">{preset.label}</p>
              <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">{preset.description}</p>
              <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
                <MetricCard label="Columns" value={`${preset.columns}`} />
                <MetricCard label="Gutter" value={`${preset.gutter}px`} />
                <MetricCard label="Margins" value={`${preset.margins}px`} />
                <MetricCard label="Container" value={preset.maxWidth} />
              </div>
            </div>

            <GridPreview preset={preset} />
            <LayoutStructure preset={preset} />
          </div>
        </TabPanel>
      ))}
    </div>
  )
}
