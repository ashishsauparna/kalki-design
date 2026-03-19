'use client'

import { cn } from 'kalki-design'
import type { KnobDef } from '@/lib/component-registry'

interface KnobPanelProps {
  knobs: KnobDef[]
  values: Record<string, string | boolean>
  onChange: (name: string, value: string | boolean) => void
}

export function KnobPanel({ knobs, values, onChange }: KnobPanelProps) {
  if (knobs.length === 0) return null

  return (
    <div className="grid grid-cols-2 gap-4 p-4 rounded-lg border border-border bg-muted/30">
      {knobs.map((knob) => {
        const value = values[knob.name]

        return (
          <div key={knob.name} className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-muted-foreground capitalize">
              {knob.name}
            </label>

            {knob.type === 'select' && (
              <select
                value={value as string}
                onChange={(e) => onChange(knob.name, e.target.value)}
                className={cn(
                  'w-full rounded-md border border-input bg-background px-3 py-1.5 text-sm',
                  'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1',
                )}
              >
                {knob.options?.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            )}

            {knob.type === 'boolean' && (
              <input
                type="checkbox"
                checked={value as boolean}
                onChange={(e) => onChange(knob.name, e.target.checked)}
                className="h-4 w-4 rounded border border-input accent-primary"
              />
            )}

            {knob.type === 'text' && (
              <input
                type="text"
                value={value as string}
                onChange={(e) => onChange(knob.name, e.target.value)}
                className={cn(
                  'w-full rounded-md border border-input bg-background px-3 py-1.5 text-sm',
                  'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1',
                )}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
