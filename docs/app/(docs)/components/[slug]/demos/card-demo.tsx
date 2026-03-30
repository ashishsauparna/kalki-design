'use client'

import { Button, Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Input } from 'kalki-design'
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
            <CardTitle>Login to your account</CardTitle>
            <CardDescription>Enter your email below to login to your account</CardDescription>
            <CardAction>
              <Button variant="link" size="md">Sign up</Button>
            </CardAction>
          </CardHeader>
          <CardContent className="space-y-3">
            <Input label="Email" type="email" placeholder="m@example.com" size="lg" />
            <Input label="Password" type="password" size="lg" />
          </CardContent>
          <CardFooter className="flex-col gap-2 border-t">
            <Button variant="primary" size="md" fullWidth>
              Login
            </Button>
            <Button variant="outline" size="md" fullWidth>
              Login with Google
            </Button>
          </CardFooter>
        </Card>
      )}
      codeTemplate={(props) =>
        `import { Button, Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Input } from 'kalki-design'

<Card${props.hoverable ? ' hoverable' : ''}>
  <CardHeader>
    <CardTitle>Login to your account</CardTitle>
    <CardDescription>Enter your email below to login to your account</CardDescription>
    <CardAction>
      <Button variant="link">Sign up</Button>
    </CardAction>
  </CardHeader>
  <CardContent className="space-y-3">
    <Input label="Email" type="email" placeholder="m@example.com" />
    <Input label="Password" type="password" />
  </CardContent>
  <CardFooter className="flex-col gap-2 border-t">
    <Button fullWidth>Login</Button>
    <Button variant="outline" fullWidth>Login with Google</Button>
  </CardFooter>
</Card>`
      }
    />
  )
}
