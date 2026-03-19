import type { PropDef } from '@/lib/component-registry'

interface PropsTableProps {
  props: PropDef[]
}

export function PropsTable({ props }: PropsTableProps) {
  return (
    <table className="w-full text-sm">
      <thead>
        <tr>
          <th className="pb-3 pr-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Name
          </th>
          <th className="pb-3 pr-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Type
          </th>
          <th className="pb-3 pr-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Default
          </th>
          <th className="pb-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Description
          </th>
        </tr>
      </thead>
      <tbody>
        {props.map((prop) => (
          <tr key={prop.name} className="border-t border-border">
            <td className="py-3 pr-4">
              <code className="text-sm font-mono text-primary">{prop.name}</code>
            </td>
            <td className="py-3 pr-4">
              <code className="text-xs font-mono text-muted-foreground">
                {prop.type}
              </code>
            </td>
            <td className="py-3 pr-4">
              <code className="text-xs font-mono">{prop.default ?? '—'}</code>
            </td>
            <td className="py-3 text-muted-foreground">{prop.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
