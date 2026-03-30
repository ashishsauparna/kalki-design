'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { CopyButton } from './copy-button'
import { codeToHtml } from 'shiki'

interface DynamicCodeBlockProps {
  code: string
  transparentBg?: boolean
}

/**
 * Client Component — uses Shiki asynchronously.
 * Provides syntax highlighting identical to VS Code for knob-driven live updates.
 */
export function DynamicCodeBlock({ code, transparentBg }: DynamicCodeBlockProps) {
  const [html, setHtml] = useState<string | null>(null)
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    let active = true
    const theme = resolvedTheme === 'dark' ? 'github-dark-default' : 'github-light'

    codeToHtml(code, { lang: 'tsx', theme })
      .then((res) => {
        if (active) setHtml(res)
      })
      .catch(console.error)

    return () => {
      active = false
    }
  }, [code, resolvedTheme])

  return (
    <div className="relative group rounded-[8px] overflow-hidden">
      <CopyButton code={code} />
      {html ? (
        <div
          dangerouslySetInnerHTML={{ __html: html }}
          className={`${transparentBg ? '[&_pre]:!bg-transparent' : '[&_pre]:!bg-[#f9f9f9] dark:[&_pre]:!bg-zinc-950'} [&_pre]:p-4 [&_pre]:overflow-x-auto [&_pre]:text-sm [&_pre]:leading-relaxed [&_code]:font-mono`}
        />
      ) : (
        <pre className={`${transparentBg ? 'bg-transparent' : 'bg-[#f9f9f9] dark:bg-zinc-950'} text-[#161616] dark:text-zinc-100 p-4 text-sm font-mono overflow-x-auto`}>
          <code>{code}</code>
        </pre>
      )}
    </div>
  )
}
