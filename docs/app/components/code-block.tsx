import { codeToHtml } from 'shiki'
import { CopyButton } from './copy-button'

interface CodeBlockProps {
  code: string
  lang?: string
}

/**
 * Server Component — uses Shiki for syntax highlighting.
 * Zero client JS. Use for static code snippets (getting started, etc.)
 */
export async function CodeBlock({ code, lang = 'tsx' }: CodeBlockProps) {
  const html = await codeToHtml(code, {
    lang,
    theme: 'github-light',
  })

  return (
    <div className="relative group rounded-[8px] overflow-hidden">
      <CopyButton code={code} />
      <div
        dangerouslySetInnerHTML={{ __html: html }}
        className="[&_pre]:!bg-[#f9f9f9] dark:[&_pre]:!bg-zinc-950 [&_pre]:p-4 [&_pre]:overflow-x-auto [&_pre]:text-sm [&_pre]:leading-relaxed [&_code]:font-mono"
      />
    </div>
  )
}

// Re-export the client version for convenience — import from here or directly
// from dynamic-code-block.tsx
export { DynamicCodeBlock } from './dynamic-code-block'
