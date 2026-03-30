'use client'

import { useState } from 'react'
import { DynamicCodeBlock } from './dynamic-code-block'

interface Tab {
  label: string
  code: string
}

interface CodeTabsProps {
  tabs: Tab[]
}

export function CodeTabs({ tabs }: CodeTabsProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  if (!tabs || tabs.length === 0) return null

  return (
    <div className="flex flex-col rounded-lg overflow-hidden bg-[#f9f9f9] dark:bg-background">
      <div className="flex items-center gap-1 border-b border-[#dcdcdc] dark:border-border px-4 py-2 overflow-x-auto bg-[#f0f0f0] dark:bg-muted/50">
        {tabs.map((tab, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIndex(idx)}
            className={`
              px-3 py-1.5 text-sm font-medium rounded-md transition-colors
              ${
                activeIndex === idx
                  ? 'bg-white dark:bg-background text-[#161616] dark:text-foreground shadow-sm ring-1 ring-[#dcdcdc] dark:ring-border'
                  : 'text-[#535353] dark:text-muted-foreground hover:text-[#161616] dark:hover:text-foreground hover:bg-[#e8e8e8] dark:hover:bg-muted'
              }
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="-mx-px -mb-px -mt-px">
        <DynamicCodeBlock code={tabs[activeIndex].code} transparentBg />
      </div>
    </div>
  )
}
