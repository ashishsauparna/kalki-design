import type { Metadata } from 'next'
import Link from 'next/link'
import { Button, Checkbox, Input, Textarea } from 'kalki-design'
import { DocsWithToc } from '@/app/components/docs-with-toc'

export const metadata: Metadata = {
  title: 'Accessibility - Kalki Design System',
  description: 'Accessibility standards, interaction contracts, and testing guidance for Kalki Design.',
}

const wcagChecks = [
  {
    pillar: 'Perceivable',
    guidance: 'Text contrast, non-color indicators, and readable content hierarchy.',
    checks: ['Contrast ratio meets WCAG AA', 'State is not conveyed by color only'],
  },
  {
    pillar: 'Operable',
    guidance: 'Full keyboard support and visible focus across all controls.',
    checks: ['Tab order is logical', 'Focus ring is always visible'],
  },
  {
    pillar: 'Understandable',
    guidance: 'Clear labels, instructions, and error recovery messages.',
    checks: ['Fields have labels', 'Errors are specific and actionable'],
  },
  {
    pillar: 'Robust',
    guidance: 'Semantic HTML and ARIA patterns compatible with assistive tech.',
    checks: ['Proper input semantics', 'ARIA attributes wired correctly'],
  },
]

const keyboardRows = [
  {
    element: 'Text input / textarea',
    key: 'Tab / Shift+Tab',
    expected: 'Moves focus in and out in logical order.',
  },
  {
    element: 'Checkbox / radio',
    key: 'Space',
    expected: 'Toggles selected state while focus remains visible.',
  },
  {
    element: 'Select / menu trigger',
    key: 'Enter / Space',
    expected: 'Opens list; arrow keys navigate options.',
  },
  {
    element: 'Dialog',
    key: 'Esc',
    expected: 'Closes dialog and returns focus to trigger.',
  },
  {
    element: 'Form submit with errors',
    key: 'Enter',
    expected: 'Shows summary + inline errors and focuses first invalid field.',
  },
]

const srContract = [
  {
    label: 'Field labels',
    detail: 'Every form control has a visible label linked via `htmlFor`/`id`.',
  },
  {
    label: 'Described by',
    detail: 'Helper and error text are connected with `aria-describedby`.',
  },
  {
    label: 'Invalid state',
    detail: 'Invalid controls set `aria-invalid="true"` when validation fails.',
  },
  {
    label: 'Error summary region',
    detail: 'Form-level error summary uses alert semantics for announcement.',
  },
]

const workflow = [
  {
    title: '1. Keyboard pass',
    detail: 'Navigate every control with Tab, Shift+Tab, Enter, Space, and Esc.',
  },
  {
    title: '2. Screen reader spot-check',
    detail: 'Verify labels, helper text, and error announcements are spoken correctly.',
  },
  {
    title: '3. Contrast checks',
    detail: 'Validate text and state pair contrast in both light and dark themes.',
  },
  {
    title: '4. Regression coverage',
    detail: 'Keep automated checks and visual snapshots for core flows.',
  },
]

const wcagExampleRows = [
  {
    criterion: '1.4.3 Contrast (Minimum)',
    scenario: 'Body text on card surface',
    howToTest: 'Check contrast ratio for text vs background in light and dark.',
    passExample: 'Ratio is >= 4.5:1 for normal text.',
    failExample: 'Muted text drops below 4.5:1.',
  },
  {
    criterion: '2.4.7 Focus Visible',
    scenario: 'Tab through input and checkbox fields',
    howToTest: 'Use keyboard only and verify a visible focus indicator always appears.',
    passExample: 'Ring/border clearly visible on every focusable element.',
    failExample: 'Focus style removed or too subtle to detect.',
  },
  {
    criterion: '3.3.1 Error Identification',
    scenario: 'Submit form with invalid email and unchecked terms',
    howToTest: 'Trigger validation and inspect inline + summary feedback.',
    passExample: 'Summary + inline text errors appear with `aria-invalid`.',
    failExample: 'Only red border shown, no message.',
  },
  {
    criterion: '3.3.2 Labels or Instructions',
    scenario: 'Review all form controls',
    howToTest: 'Ensure each field has a visible label and clear instruction when needed.',
    passExample: 'Label and helper text are programmatically associated.',
    failExample: 'Placeholder-only field without label.',
  },
]

const manualChecklist = [
  'Tab through the entire page and confirm visible focus on every interactive element.',
  'Verify labels and helper/error text are announced by a screen reader.',
  'Submit with invalid form values and verify summary + inline errors both appear.',
  'Check contrast in light and dark mode for text, borders, and focus rings.',
  'Zoom to 200% and verify layout remains usable without hidden critical content.',
  'Disable pointer input and confirm keyboard-only completion of critical flows.',
]

const sectionLinks = [
  { id: 'how-to-use', label: 'How To Use This Page' },
  { id: 'wcag-target', label: 'WCAG AA Target' },
  { id: 'keyboard-contract', label: 'Keyboard Contract' },
  { id: 'form-pattern', label: 'Accessible Form Pattern' },
  { id: 'screen-reader-contract', label: 'Screen Reader Contract' },
  { id: 'manual-checklist', label: 'Manual Test Checklist' },
  { id: 'wcag-example', label: 'WCAG Testing Example' },
  { id: 'testing-workflow', label: 'Testing Workflow' },
  { id: 'common-failures', label: 'Common Failures' },
  { id: 'related-guides', label: 'Related Guides' },
]

export default function AccessibilityPage() {
  return (
    <DocsWithToc links={sectionLinks}>
      <div>
        <div>
          <h1 className="text-[20px] font-semibold text-[#161616] dark:text-foreground">Accessibility</h1>
          <p className="mt-2 text-[14px] text-[#535353] dark:text-muted-foreground">
            Build inclusive interfaces by default with semantic markup, keyboard support, and clear
            validation behavior.
          </p>
        </div>

        <section id="how-to-use" className="scroll-mt-24 space-y-3 border-t border-border pt-6">
          <h2 className="text-[16px] font-semibold text-[#161616] dark:text-foreground">How To Use This Page</h2>
          <div className="grid gap-2 sm:grid-cols-3">
            <div className="rounded-[8px] border border-border bg-background px-3 py-2.5">
              <p className="text-[13px] font-medium text-foreground">1. Foundations</p>
              <p className="mt-1 text-[12px] leading-relaxed text-muted-foreground">
                Confirm WCAG AA targets and interaction contracts.
              </p>
            </div>
            <div className="rounded-[8px] border border-border bg-background px-3 py-2.5">
              <p className="text-[13px] font-medium text-foreground">2. Patterns</p>
              <p className="mt-1 text-[12px] leading-relaxed text-muted-foreground">
                Review interaction and screen reader contracts before implementation.
              </p>
            </div>
            <div className="rounded-[8px] border border-border bg-background px-3 py-2.5">
              <p className="text-[13px] font-medium text-foreground">3. Test Checklist</p>
              <p className="mt-1 text-[12px] leading-relaxed text-muted-foreground">
                Run manual checks before release and attach results to QA.
              </p>
            </div>
          </div>
        </section>

        <section id="wcag-target" className="scroll-mt-24 space-y-3 border-t border-border pt-6">
          <h2 className="text-[16px] font-semibold text-[#161616] dark:text-foreground">WCAG AA Target</h2>
          <div className="grid gap-2 sm:grid-cols-2">
            {wcagChecks.map((item) => (
              <div key={item.pillar} className="rounded-[8px] border border-border bg-background px-3 py-2.5">
                <p className="text-[13px] font-medium text-foreground">{item.pillar}</p>
                <p className="mt-1 text-[12px] leading-relaxed text-muted-foreground">{item.guidance}</p>
                <ul className="mt-2 list-disc space-y-1 pl-4 text-[12px] text-muted-foreground">
                  {item.checks.map((check) => (
                    <li key={check}>{check}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section id="keyboard-contract" className="scroll-mt-24 space-y-3 border-t border-border pt-6">
          <h2 className="text-[16px] font-semibold text-[#161616] dark:text-foreground">Keyboard Interaction Contract</h2>
          <div className="overflow-x-auto rounded-lg border border-border bg-background">
            <table className="w-full border-collapse text-left text-sm">
              <thead className="bg-muted/30">
                <tr>
                  <th className="border-b border-border p-3 font-medium text-foreground">Element</th>
                  <th className="border-b border-border p-3 font-medium text-foreground">Key</th>
                  <th className="border-b border-border p-3 font-medium text-foreground">Expected Behavior</th>
                </tr>
              </thead>
              <tbody>
                {keyboardRows.map((row) => (
                  <tr key={`${row.element}-${row.key}`} className="border-b border-border last:border-b-0">
                    <td className="p-3 text-muted-foreground">{row.element}</td>
                    <td className="p-3 text-muted-foreground">{row.key}</td>
                    <td className="p-3 text-muted-foreground">{row.expected}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section id="form-pattern" className="scroll-mt-24 space-y-3 border-t border-border pt-6">
          <h2 className="text-[16px] font-semibold text-[#161616] dark:text-foreground">Accessible Form Pattern</h2>
          <p className="text-[13px] leading-relaxed text-muted-foreground">
            On submit failures, show a form-level summary plus inline field messages.
          </p>
          <div className="space-y-3 rounded-[10px] border border-border bg-background p-4">
            <div role="alert" aria-live="assertive" className="rounded-[8px] border border-destructive/40 bg-destructive/5 p-3">
              <p className="text-[13px] font-semibold text-destructive">There is a problem</p>
              <ul className="mt-2 list-disc space-y-1 pl-4 text-[12px] text-destructive">
                <li>
                  <a href="#a11y-email" className="underline">
                    Enter an email address in the correct format
                  </a>
                </li>
                <li>
                  <a href="#a11y-terms" className="underline">
                    Accept terms to continue
                  </a>
                </li>
              </ul>
            </div>

            <div className="grid gap-3 lg:grid-cols-2">
              <Input
                id="a11y-email"
                label="Email"
                defaultValue="john@"
                error="Enter an email address in the correct format"
              />
              <Input
                id="a11y-name"
                label="Full name"
                helperText="Use your legal name as on ID."
                defaultValue="John Carter"
              />
            </div>

            <Textarea
              id="a11y-details"
              label="Issue details"
              helperText="Include what happened and when it started."
              placeholder="Describe the issue"
            />

            <Checkbox
              id="a11y-terms"
              label="I accept terms and conditions"
              error="Accept terms to continue"
            />

            <div className="flex justify-end">
              <Button type="button" variant="primary" size="md">
                Submit
              </Button>
            </div>
          </div>
        </section>

        <section id="screen-reader-contract" className="scroll-mt-24 space-y-3 border-t border-border pt-6">
          <h2 className="text-[16px] font-semibold text-[#161616] dark:text-foreground">Screen Reader Contract</h2>
          <div className="grid gap-2 sm:grid-cols-2">
            {srContract.map((item) => (
              <div key={item.label} className="rounded-[8px] border border-border bg-background px-3 py-2.5">
                <p className="text-[13px] font-medium text-foreground">{item.label}</p>
                <p className="mt-1 text-[12px] leading-relaxed text-muted-foreground">{item.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="manual-checklist" className="scroll-mt-24 space-y-3 border-t border-border pt-6">
          <h2 className="text-[16px] font-semibold text-[#161616] dark:text-foreground">Manual Test Checklist</h2>
          <p className="text-[13px] leading-relaxed text-muted-foreground">
            USWDS-style release checklist. Run these checks in product context, not only in isolation.
          </p>
          <div className="space-y-2 rounded-[10px] border border-border bg-background p-4">
            {manualChecklist.map((item, index) => (
              <div key={item} className="flex items-start gap-2">
                <span className="mt-0.5 inline-flex size-4 shrink-0 items-center justify-center rounded border border-border text-[10px] text-muted-foreground">
                  {index + 1}
                </span>
                <p className="text-[13px] leading-relaxed text-muted-foreground">{item}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="wcag-example" className="scroll-mt-24 space-y-3 border-t border-border pt-6">
          <h2 className="text-[16px] font-semibold text-[#161616] dark:text-foreground">WCAG Testing Example</h2>
          <p className="text-[13px] leading-relaxed text-muted-foreground">
            Example manual test pass for a form flow. Use this structure in QA tickets and release checks.
          </p>
          <div className="overflow-x-auto rounded-lg border border-border bg-background">
            <table className="w-full min-w-[980px] border-collapse text-left text-sm">
              <thead className="bg-muted/30">
                <tr>
                  <th className="border-b border-border p-3 font-medium text-foreground">WCAG Criterion</th>
                  <th className="border-b border-border p-3 font-medium text-foreground">Scenario</th>
                  <th className="border-b border-border p-3 font-medium text-foreground">How To Test</th>
                  <th className="border-b border-border p-3 font-medium text-foreground">Pass</th>
                  <th className="border-b border-border p-3 font-medium text-foreground">Fail</th>
                </tr>
              </thead>
              <tbody>
                {wcagExampleRows.map((row) => (
                  <tr key={row.criterion} className="border-b border-border last:border-b-0 align-top">
                    <td className="p-3 text-foreground">{row.criterion}</td>
                    <td className="p-3 text-muted-foreground">{row.scenario}</td>
                    <td className="p-3 text-muted-foreground">{row.howToTest}</td>
                    <td className="p-3 text-green-700 dark:text-green-400">{row.passExample}</td>
                    <td className="p-3 text-destructive">{row.failExample}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section id="testing-workflow" className="scroll-mt-24 space-y-3 border-t border-border pt-6">
          <h2 className="text-[16px] font-semibold text-[#161616] dark:text-foreground">Testing Workflow</h2>
          <div className="grid gap-2 sm:grid-cols-2">
            {workflow.map((step) => (
              <div key={step.title} className="rounded-[8px] border border-border bg-background px-3 py-2.5">
                <p className="text-[13px] font-medium text-foreground">{step.title}</p>
                <p className="mt-1 text-[12px] leading-relaxed text-muted-foreground">{step.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="common-failures" className="scroll-mt-24 space-y-3 border-t border-border pt-6">
          <h2 className="text-[16px] font-semibold text-[#161616] dark:text-foreground">Common Failures</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-[10px] border border-border bg-background p-4">
              <p className="text-[12px] font-semibold uppercase tracking-[0.2px] text-red-600">Common Problems</p>
              <ul className="mt-2 list-disc space-y-1 pl-4 text-[13px] text-muted-foreground">
                <li>Missing visible labels or relying on placeholder text only.</li>
                <li>Removing focus styles for visual polish.</li>
                <li>Using color as the only state indicator.</li>
                <li>Showing generic errors without recovery guidance.</li>
              </ul>
            </div>
            <div className="rounded-[10px] border border-border bg-background p-4">
              <p className="text-[12px] font-semibold uppercase tracking-[0.2px] text-green-600">Preferred Outcome</p>
              <ul className="mt-2 list-disc space-y-1 pl-4 text-[13px] text-muted-foreground">
                <li>Every control has clear labels and helper/error mapping.</li>
                <li>Keyboard-only users can complete full flows.</li>
                <li>Errors are visible inline and in summary on submit.</li>
                <li>All states remain readable in both light and dark themes.</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="related-guides" className="scroll-mt-24 space-y-3 border-t border-border pt-6">
          <h2 className="text-[16px] font-semibold text-[#161616] dark:text-foreground">Related Guides</h2>
          <div className="grid gap-2 sm:grid-cols-2">
            <Link
              href="/validation"
              className="rounded-[8px] border border-border bg-background px-3 py-2 text-[13px] text-foreground hover:bg-muted/30 transition-colors"
            >
              Validation
            </Link>
            <Link
              href="/theme"
              className="rounded-[8px] border border-border bg-background px-3 py-2 text-[13px] text-foreground hover:bg-muted/30 transition-colors"
            >
              Theme
            </Link>
            <Link
              href="/components/input"
              className="rounded-[8px] border border-border bg-background px-3 py-2 text-[13px] text-foreground hover:bg-muted/30 transition-colors"
            >
              Input Component
            </Link>
            <Link
              href="/components/dialog"
              className="rounded-[8px] border border-border bg-background px-3 py-2 text-[13px] text-foreground hover:bg-muted/30 transition-colors"
            >
              Dialog Component
            </Link>
          </div>
        </section>
      </div>
    </DocsWithToc>
  )
}
