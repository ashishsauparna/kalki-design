'use client'

import {
  Checkbox,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'kalki-design'
import type { KnobDef } from '@/lib/component-registry'

interface KnobPanelProps {
  knobs: KnobDef[]
  values: Record<string, string | boolean>
  onChange: (name: string, value: string | boolean) => void
}

export function KnobPanel({ knobs, values, onChange }: KnobPanelProps) {
  if (knobs.length === 0) return null

  const toLabel = (name: string) =>
    name
      .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
      .replace(/[_-]+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .replace(/\b\w/g, (c) => c.toUpperCase())

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {knobs.map((knob) => {
        const value = values[knob.name]
        const fieldLabel = toLabel(knob.name)
        const heading = knob.type === 'boolean' ? 'State' : fieldLabel

        return (
          <div key={knob.name} className="flex w-full flex-col items-start gap-1.5">
            <label className="text-xs font-medium text-[#71717a] dark:text-muted-foreground">
              {heading}
            </label>

            {knob.type === 'select' && (
              <Select
                value={value as string}
                onValueChange={(nextValue: string) => onChange(knob.name, nextValue)}
              >
                <SelectTrigger size="sm" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {knob.options?.map((option) => (
                    <SelectItem key={option} value={option}>
                      {toLabel(option)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}

            {knob.type === 'boolean' && (
              <Checkbox
                checked={value as boolean}
                onChange={(e) => onChange(knob.name, e.target.checked)}
                label={fieldLabel}
              />
            )}

            {knob.type === 'text' && (
              <Input
                type="text"
                value={value as string}
                onChange={(e) => onChange(knob.name, e.target.value)}
                className="h-8 w-full text-sm"
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
