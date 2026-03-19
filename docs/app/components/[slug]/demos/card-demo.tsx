'use client'

import { Card, CardHeader, CardContent, CardFooter } from 'kalki-design'
import { ComponentPreview } from '@/app/components/component-preview'
import type { ComponentMeta } from '@/lib/component-registry'

interface CardDemoProps {
  meta: ComponentMeta
}

export function CardDemo({ meta }: CardDemoProps) {
  return (
    <ComponentPreview
      meta={meta}
      defaultChildren=""
      renderPreview={(props) => (
        <Card hoverable={props.hoverable as boolean | undefined} className="w-full max-w-sm">
          <CardHeader>
            <h3 className="text-lg font-semibold">Card Title</h3>
            <p className="text-sm text-muted-foreground">Card description</p>
          </CardHeader>
          <CardContent>
            <p className="text-sm">Card content goes here.</p>
          </CardContent>
          <CardFooter>
            <button className="text-sm text-primary hover:underline">Learn more</button>
          </CardFooter>
        </Card>
      )}
      codeTemplate={(props) =>
        `import { Card, CardHeader, CardContent, CardFooter } from 'kalki-design'

<Card${props.hoverable ? ' hoverable' : ''}>
  <CardHeader>
    <h3>Card Title</h3>
    <p>Card description</p>
  </CardHeader>
  <CardContent>
    <p>Card content goes here.</p>
  </CardContent>
  <CardFooter>
    <button>Learn more</button>
  </CardFooter>
</Card>`
      }
    />
  )
}
