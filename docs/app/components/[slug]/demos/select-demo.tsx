'use client'

import { Select } from 'kalki-design'
import { ComponentPreview } from '@/app/components/component-preview'
import type { ComponentMeta } from '@/lib/component-registry'

interface SelectDemoProps {
  meta: ComponentMeta
}

export function SelectDemo({ meta }: SelectDemoProps) {
  return (
    <ComponentPreview
      meta={meta}
      defaultChildren=""
      renderPreview={(props) => (
        <div className="w-full max-w-sm">
          <Select
            label={(props.label as string) || undefined}
            error={(props.error as string) || undefined}
            disabled={props.disabled as boolean | undefined}
          >
            <option value="us">United States</option>
            <option value="ca">Canada</option>
            <option value="uk">United Kingdom</option>
            <option value="au">Australia</option>
          </Select>
        </div>
      )}
      codeTemplate={(props) => `import { Select } from 'kalki-design'

<Select${props.label ? `\n  label="${props.label}"` : ''}${props.error ? `\n  error="${props.error}"` : ''}${props.disabled ? '\n  disabled\n' : ''}>
  <option value="us">United States</option>
  <option value="ca">Canada</option>
  <option value="uk">United Kingdom</option>
  <option value="au">Australia</option>
</Select>`}
    />
  )
}
