'use client'

import { Button } from 'kalki-design'
import { ComponentPreview } from '@/app/components/component-preview'
import type { ComponentMeta } from '@/lib/component-registry'

interface ButtonDemoProps {
  meta: ComponentMeta
}

export function ButtonDemo({ meta }: ButtonDemoProps) {
  return (
    <ComponentPreview
      meta={meta}
      defaultChildren="Click me"
      renderPreview={(props) => (
        <Button
          variant={props.variant as 'primary' | 'secondary' | 'ghost' | 'destructive' | undefined}
          size={props.size as 'sm' | 'md' | 'lg' | undefined}
          disabled={props.disabled as boolean | undefined}
        >
          Click me
        </Button>
      )}
    />
  )
}
