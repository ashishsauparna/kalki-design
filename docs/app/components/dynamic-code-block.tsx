'use client'

import { CopyButton } from './copy-button'

interface DynamicCodeBlockProps {
  code: string
}

/**
 * Client Component — no Shiki, lightweight pre/code block.
 * Use for knob-driven previews where the code string changes at runtime.
 */
export function DynamicCodeBlock({ code }: DynamicCodeBlockProps) {
  return (
    <div className="relative group rounded-lg overflow-hidden border border-border">
      <CopyButton code={code} />
      <pre className="bg-zinc-950 text-zinc-100 rounded-lg p-4 text-sm font-mono overflow-x-auto">
        <code>{code}</code>
      </pre>
    </div>
  )
}
