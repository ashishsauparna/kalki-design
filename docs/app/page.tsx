import Link from 'next/link'
import { Button } from 'kalki-design'
import { ComponentGrid } from '@/app/components/component-grid'
import { ArrowRight, GithubLogo } from '@phosphor-icons/react/dist/ssr'

export default function Home() {
  return (
    <div className="container relative mx-auto px-4 md:px-8 max-w-screen-2xl">
      <section className="mx-auto flex max-w-[980px] flex-col items-center gap-2 py-8 md:py-12 md:pb-8 lg:py-24 lg:pb-20">
        <Link
          href="/getting-started"
          className="inline-flex items-center rounded-lg bg-muted px-3 py-1 text-sm font-medium"
        >
          🎉 <span className="sm:hidden">New component library</span>
          <span className="hidden sm:inline">
            Announcing Kalki Design Component Library
          </span>
          <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
        <h1 className="text-center text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1]">
          Build your component library.
        </h1>
        <p className="max-w-[750px] text-center text-lg font-light text-muted-foreground sm:text-xl">
          Beautifully designed components that you can copy and paste into your apps. Accessible. Customizable. Open Source.
        </p>
        <div className="flex w-full items-center justify-center space-x-4 py-4 md:pb-10">
          <Link href="/getting-started">
            <Button size="md" className="h-10 px-4 py-2">Get Started</Button>
          </Link>
          <Link
            target="_blank"
            rel="noreferrer"
            href="https://github.com/shadcn-ui/ui"
          >
            <Button variant="outline" size="md" className="h-10 px-4 py-2 gap-2">
              <GithubLogo className="w-4 h-4" />
              GitHub
            </Button>
          </Link>
        </div>
      </section>

      <section className="mx-auto flex max-w-[980px] flex-col items-center pb-8 space-y-8">
        <ComponentGrid />
      </section>
    </div>
  )
}
