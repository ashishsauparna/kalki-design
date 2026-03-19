'use client'

import { Input } from 'kalki-design'
import { ComponentPreview } from '@/app/components/component-preview'
import type { ComponentMeta } from '@/lib/component-registry'

interface InputDemoProps {
  meta: ComponentMeta
}

export function InputDemo({ meta }: InputDemoProps) {
  return (
    <ComponentPreview
      meta={meta}
      defaultChildren=""
      renderPreview={(props) => (
        <div className="w-full max-w-sm">
          <Input
            label={(props.label as string) || undefined}
            placeholder={(props.placeholder as string) || undefined}
            error={(props.error as string) || undefined}
            disabled={props.disabled as boolean | undefined}
          />
        </div>
      )}
    />
  )
}
