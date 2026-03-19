'use client'

import { useState, useMemo } from 'react'
import type { ComponentMeta } from '@/lib/component-registry'
import { KnobPanel } from './knob-panel'
import { DynamicCodeBlock } from './dynamic-code-block'

interface ComponentPreviewProps {
  meta: ComponentMeta
  renderPreview: (props: Record<string, string | boolean>) => React.ReactNode
  defaultChildren?: string
  codeTemplate?: (props: Record<string, string | boolean>) => string
}

export function ComponentPreview({
  meta,
  renderPreview,
  defaultChildren = 'Click me',
  codeTemplate,
}: ComponentPreviewProps) {
  // Initialize knob values from registry defaults
  const initialValues = Object.fromEntries(
    meta.knobs.map((k) => [k.name, k.default]),
  ) as Record<string, string | boolean>

  const [knobValues, setKnobValues] = useState<Record<string, string | boolean>>(
    initialValues,
  )

  const handleKnobChange = (name: string, value: string | boolean) => {
    setKnobValues((prev) => ({ ...prev, [name]: value }))
  }

  // Build JSX snippet from current knob state
  const codeString = useMemo(() => {
    if (codeTemplate) {
      return codeTemplate(knobValues)
    }

    const propsStr = Object.entries(knobValues)
      .filter(([key, val]) => {
        const knob = meta.knobs.find((k) => k.name === key)
        return val !== knob?.default // only show non-default props
      })
      .map(([key, val]) => {
        if (typeof val === 'boolean') return val ? key : ''
        return `${key}="${val}"`
      })
      .filter(Boolean)
      .join(' ')

    const openTag = propsStr
      ? `<${meta.importName} ${propsStr}>`
      : `<${meta.importName}>`

    return `import { ${meta.importName} } from 'kalki-design'\n\n${openTag}${defaultChildren}</${meta.importName}>`
  }, [knobValues, meta, defaultChildren, codeTemplate])

  return (
    <div className="flex flex-col gap-4">
      {/* Live preview area */}
      <div className="flex min-h-[200px] items-center justify-center rounded-lg border border-border bg-background p-10">
        {renderPreview(knobValues)}
      </div>

      {/* Knob controls */}
      {meta.knobs.length > 0 && (
        <KnobPanel
          knobs={meta.knobs}
          values={knobValues}
          onChange={handleKnobChange}
        />
      )}

      {/* Dynamic code snippet */}
      <DynamicCodeBlock code={codeString} />
    </div>
  )
}
