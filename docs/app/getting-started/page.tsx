import type { Metadata } from 'next'
import { CodeBlock } from '@/app/components/code-block'

export const metadata: Metadata = {
  title: 'Getting Started - Kalki Design System',
}

export default function GettingStartedPage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Getting Started</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Get up and running with Kalki Design System in minutes.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Installation</h2>
        <p className="text-muted-foreground leading-relaxed">
          Install the package from npm using your preferred package manager.
        </p>
        <CodeBlock code="npm install kalki-design" lang="bash" />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Setup</h2>
        <p className="text-muted-foreground leading-relaxed">
          Import the styles in your root layout or global CSS file:
        </p>
        <CodeBlock code={`import 'kalki-design/tokens.css'`} lang="typescript" />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Your first component</h2>
        <p className="text-muted-foreground leading-relaxed">
          Import and use components directly — no additional configuration required.
        </p>
        <CodeBlock
          code={`import { Button } from 'kalki-design'

export default function App() {
  return (
    <Button variant="primary" size="md">
      Get Started
    </Button>
  )
}`}
          lang="tsx"
        />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Tailwind CSS</h2>
        <p className="text-muted-foreground leading-relaxed">
          Kalki Design uses Tailwind CSS v4 for styling. Make sure your project has Tailwind CSS configured.
        </p>
      </section>
    </div>
  )
}
