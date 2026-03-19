import { ComponentGrid } from '@/app/components/component-grid'

export default function Home() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">Kalki Design System</h1>
        <p className="mt-3 text-lg text-muted-foreground max-w-2xl">
          A modern React component library built with Tailwind CSS. Beautiful, accessible, and ready to use.
        </p>
      </div>
      <ComponentGrid />
    </div>
  )
}
