import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Typography - Kalki Design',
  description: 'Typography scale and fonts for Kalki Design System',
}

export default function TypographyPage() {
  return (
    <div className="max-w-4xl space-y-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Typography</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Styles for headings, paragraphs, and font families.
        </p>
      </div>

      <div className="space-y-8">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground mb-4 border-b pb-2">Font Families</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="border rounded-lg p-6 bg-card">
              <div className="text-sm text-muted-foreground mb-2">Primary / Sans</div>
              <div className="text-3xl font-bold font-sans">Geist Variable</div>
              <div className="mt-4 text-sm font-sans tracking-tight opacity-80">
                ABCDEFGHIJKLMNOPQRSTUVWXYZ<br />
                abcdefghijklmnopqrstuvwxyz<br />
                0123456789
              </div>
            </div>
            <div className="border rounded-lg p-6 bg-card">
              <div className="text-sm text-muted-foreground mb-2">Code / Mono</div>
              <div className="text-3xl font-bold font-mono">Geist Mono</div>
              <div className="mt-4 text-sm font-mono tracking-tight opacity-80">
                ABCDEFGHIJKLMNOPQRSTUVWXYZ<br />
                abcdefghijklmnopqrstuvwxyz<br />
                0123456789
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground mb-4 border-b pb-2">Headings</h2>
          <div className="space-y-6">
            <div className="grid sm:grid-cols-[120px_1fr] items-baseline gap-4">
              <div className="text-sm text-muted-foreground font-mono">text-4xl</div>
              <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">The quick brown fox.</h1>
            </div>
            <div className="grid sm:grid-cols-[120px_1fr] items-baseline gap-4">
              <div className="text-sm text-muted-foreground font-mono">text-3xl</div>
              <h2 className="text-3xl font-semibold tracking-tight">The quick brown fox.</h2>
            </div>
            <div className="grid sm:grid-cols-[120px_1fr] items-baseline gap-4">
              <div className="text-sm text-muted-foreground font-mono">text-2xl</div>
              <h3 className="text-2xl font-semibold tracking-tight">The quick brown fox.</h3>
            </div>
            <div className="grid sm:grid-cols-[120px_1fr] items-baseline gap-4">
              <div className="text-sm text-muted-foreground font-mono">text-xl</div>
              <h4 className="text-xl font-semibold tracking-tight">The quick brown fox.</h4>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground mb-4 border-b pb-2">Body</h2>
          <div className="space-y-6">
            <div className="grid sm:grid-cols-[120px_1fr] items-start gap-4">
              <div className="text-sm text-muted-foreground font-mono pt-1">text-lg</div>
              <p className="text-lg text-foreground">
                This is a large paragraph. It's often used for lead texts or intros. The quick brown fox jumps over the lazy dog.
              </p>
            </div>
            <div className="grid sm:grid-cols-[120px_1fr] items-start gap-4">
              <div className="text-sm text-muted-foreground font-mono pt-1">text-base</div>
              <p className="text-base text-foreground leading-7">
                This is standard body text. It is used for most paragraph content throughout the application. The quick brown fox jumps over the lazy dog.
              </p>
            </div>
            <div className="grid sm:grid-cols-[120px_1fr] items-start gap-4">
              <div className="text-sm text-muted-foreground font-mono pt-1">text-sm</div>
              <p className="text-sm text-muted-foreground">
                This is small text, often used for captions or secondary information. The quick brown fox jumps over the lazy dog.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
