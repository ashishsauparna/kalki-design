import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { componentRegistry, getComponentBySlug } from '@/lib/component-registry'
import type { ComponentMeta } from '@/lib/component-registry'
import { PropsTable } from '@/app/components/props-table'
import { ButtonDemo } from './demos/button-demo'
import { InputDemo } from './demos/input-demo'
import { CardDemo } from './demos/card-demo'
import { TextareaDemo } from './demos/textarea-demo'
import { CheckboxDemo } from './demos/checkbox-demo'
import { RadioDemo } from './demos/radio-demo'
import { SwitchDemo } from './demos/switch-demo'
import { SelectDemo } from './demos/select-demo'
import { DialogDemo } from './demos/dialog-demo'
import { ToastDemo } from './demos/toast-demo'
import { AccordionDemo } from './demos/accordion-demo'

const demoMap: Record<string, React.ComponentType<{ meta: ComponentMeta }>> = {
  button: ButtonDemo,
  input: InputDemo,
  card: CardDemo,
  textarea: TextareaDemo,
  checkbox: CheckboxDemo,
  radio: RadioDemo,
  switch: SwitchDemo,
  select: SelectDemo,
  dialog: DialogDemo,
  toast: ToastDemo,
  accordion: AccordionDemo,
}

export function generateStaticParams() {
  return componentRegistry.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const comp = getComponentBySlug(slug)
  if (!comp) return {}
  return { title: `${comp.name} - Kalki Design System` }
}

export default async function ComponentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const component = getComponentBySlug(slug)

  if (!component) {
    notFound()
  }

  const DemoComponent = demoMap[component.slug]

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{component.name}</h1>
        <p className="mt-2 text-lg text-muted-foreground">{component.description}</p>
      </div>

      {DemoComponent ? (
        <DemoComponent meta={component} />
      ) : (
        <div className="flex min-h-[200px] items-center justify-center rounded-lg border border-border bg-background p-10 text-muted-foreground text-sm">
          Demo not yet available for this component.
        </div>
      )}

      <div>
        <h2 className="text-xl font-semibold mb-4">API Reference</h2>
        <PropsTable props={component.props} />
      </div>
    </div>
  )
}
