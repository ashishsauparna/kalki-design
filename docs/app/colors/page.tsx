import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Colors - Kalki Design',
  description: 'Color tokens and semantics for Kalki Design System',
}

const semanticColors = [
  { name: 'Background', variable: 'bg-background', border: 'border-border', text: 'text-foreground' },
  { name: 'Foreground', variable: 'bg-foreground', border: 'border-foreground', text: 'text-background' },
  { name: 'Primary', variable: 'bg-primary', border: 'border-primary', text: 'text-primary-foreground' },
  { name: 'Primary Foreground', variable: 'bg-primary-foreground', border: 'border-primary-foreground', text: 'text-primary' },
  { name: 'Secondary', variable: 'bg-secondary', border: 'border-secondary', text: 'text-secondary-foreground' },
  { name: 'Muted', variable: 'bg-muted', border: 'border-muted', text: 'text-muted-foreground' },
  { name: 'Accent', variable: 'bg-accent', border: 'border-accent', text: 'text-accent-foreground' },
  { name: 'Destructive', variable: 'bg-destructive', border: 'border-destructive', text: 'text-destructive-foreground' },
  { name: 'Border', variable: 'bg-border', border: 'border-foreground/20', text: 'text-foreground' },
  { name: 'Input', variable: 'bg-input', border: 'border-foreground/20', text: 'text-foreground' },
  { name: 'Ring', variable: 'bg-ring', border: 'border-ring', text: 'text-background' },
]

export default function ColorsPage() {
  return (
    <div className="max-w-4xl space-y-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Colors</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Semantic color tokens that map seamlessly to the light and dark themes.
        </p>
      </div>

      <div className="space-y-8">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground mb-4">Semantic Tokens</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {semanticColors.map((color) => (
              <div key={color.name} className="flex flex-col gap-2">
                <div 
                  className={`h-24 w-full rounded-md border ${color.variable} ${color.border} flex items-center justify-center p-2 shadow-sm`}
                >
                  <span className={`text-xs font-medium ${color.text}`}>Text</span>
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground">{color.name}</div>
                  <div className="text-xs text-muted-foreground font-mono">{color.variable.replace('bg-', '')}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
