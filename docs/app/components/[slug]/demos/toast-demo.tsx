'use client'

import * as React from 'react'
import { Button, useToast, type ToastType } from 'kalki-design'
import { ComponentPreview } from '@/app/components/component-preview'
import type { ComponentMeta } from '@/lib/component-registry'

export function ToastDemo({ meta }: { meta: ComponentMeta }) {
  const { addToast } = useToast()

  return (
    <ComponentPreview
      meta={meta}
      defaultChildren=""
      renderPreview={(props) => (
        <Button
          onClick={() => {
            const duration = parseInt(props.duration as string, 10)
            addToast(props.message as string || 'This is a sample toast message.', props.type as ToastType)
          }}
        >
          Show Toast
        </Button>
      )}
      codeTemplate={(props) => `import { useToast, Button } from 'kalki-design'

export function Example() {
  const { addToast } = useToast()

  return (
    <Button 
      onClick={() => addToast('${props.message || 'Action successful'}', '${props.type || 'info'}')}
    >
      Show Toast
    </Button>
  )
}`}
    />
  )
}
