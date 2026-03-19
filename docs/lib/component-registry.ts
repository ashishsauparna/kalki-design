export type PropDef = {
  name: string
  type: string
  default?: string
  description: string
}

export type KnobDef = {
  name: string
  type: 'select' | 'boolean' | 'text'
  options?: string[]
  default: string | boolean
}

export type ComponentMeta = {
  slug: string
  name: string
  description: string
  category: 'Forms' | 'Data Display' | 'Feedback' | 'Layout'
  props: PropDef[]
  knobs: KnobDef[]
  importName: string
}

export const CATEGORIES: ComponentMeta['category'][] = [
  'Forms',
  'Data Display',
  'Feedback',
  'Layout',
]

export const componentRegistry: ComponentMeta[] = [
  {
    slug: 'button',
    name: 'Button',
    description:
      'A clickable element that triggers an action. Supports multiple visual variants and sizes.',
    category: 'Forms',
    importName: 'Button',
    props: [
      {
        name: 'variant',
        type: "'primary' | 'secondary' | 'ghost' | 'destructive'",
        default: "'primary'",
        description: 'Controls the visual style of the button.',
      },
      {
        name: 'size',
        type: "'sm' | 'md' | 'lg'",
        default: "'md'",
        description: 'Controls the size of the button.',
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        description: 'Prevents interaction and applies muted styling.',
      },
      {
        name: 'children',
        type: 'ReactNode',
        description: 'Content rendered inside the button.',
      },
    ],
    knobs: [
      {
        name: 'variant',
        type: 'select',
        options: ['primary', 'secondary', 'ghost', 'destructive'],
        default: 'primary',
      },
      {
        name: 'size',
        type: 'select',
        options: ['sm', 'md', 'lg'],
        default: 'md',
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: false,
      },
    ],
  },
  {
    slug: 'input',
    name: 'Input',
    description:
      'A text input field with optional label, helper text, and error state support.',
    category: 'Forms',
    importName: 'Input',
    props: [
      {
        name: 'label',
        type: 'string',
        description: 'Accessible label rendered above the input.',
      },
      {
        name: 'placeholder',
        type: 'string',
        description: 'Placeholder text displayed when the input is empty.',
      },
      {
        name: 'error',
        type: 'string | boolean',
        description:
          'Error state. Pass a string for an error message or true to apply error styling.',
      },
      {
        name: 'helperText',
        type: 'string',
        description: 'Supplementary text displayed below the input.',
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        description: 'Prevents interaction and applies muted styling.',
      },
    ],
    knobs: [
      {
        name: 'label',
        type: 'text',
        default: 'Email',
      },
      {
        name: 'placeholder',
        type: 'text',
        default: 'you@example.com',
      },
      {
        name: 'error',
        type: 'text',
        default: '',
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: false,
      },
    ],
  },
  {
    slug: 'card',
    name: 'Card',
    description:
      'A container component with header, content, and footer slots for grouping related content.',
    category: 'Data Display',
    importName: 'Card',
    props: [
      {
        name: 'hoverable',
        type: 'boolean',
        default: 'false',
        description: 'Adds a shadow lift effect on hover.',
      },
      {
        name: 'className',
        type: 'string',
        description: 'Additional CSS classes for custom styling.',
      },
      {
        name: 'children',
        type: 'ReactNode',
        description:
          'Content rendered inside the card. Use CardHeader, CardContent, CardFooter sub-components.',
      },
    ],
    knobs: [
      {
        name: 'hoverable',
        type: 'boolean',
        default: false,
      },
    ],
  },
  {
    slug: 'textarea',
    name: 'Textarea',
    description: 'A multi-line text input field with auto-resizing capability.',
    category: 'Forms',
    importName: 'Textarea',
    props: [
      { name: 'label', type: 'string', description: 'Accessible label rendered above the textarea.' },
      { name: 'placeholder', type: 'string', description: 'Placeholder text displayed when empty.' },
      { name: 'error', type: 'string | boolean', description: 'Error state message or styling.' },
      { name: 'helperText', type: 'string', description: 'Supplementary text below the textarea.' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Prevents interaction.' },
    ],
    knobs: [
      { name: 'label', type: 'text', default: 'Bio' },
      { name: 'placeholder', type: 'text', default: 'Tell us about yourself...' },
      { name: 'error', type: 'text', default: '' },
      { name: 'disabled', type: 'boolean', default: false },
    ],
  },
  {
    slug: 'checkbox',
    name: 'Checkbox',
    description: 'A control that allows the user to toggle between checked and not checked.',
    category: 'Forms',
    importName: 'Checkbox',
    props: [
      { name: 'label', type: 'string', description: 'Label rendered next to the checkbox.' },
      { name: 'helperText', type: 'string', description: 'Supplementary text below the label.' },
      { name: 'error', type: 'string | boolean', description: 'Error state message or styling.' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Prevents interaction.' },
    ],
    knobs: [
      { name: 'label', type: 'text', default: 'Accept terms and conditions' },
      { name: 'error', type: 'text', default: '' },
      { name: 'disabled', type: 'boolean', default: false },
    ],
  },
  {
    slug: 'radio',
    name: 'Radio',
    description: 'A control that allows the user to select a single option from a set.',
    category: 'Forms',
    importName: 'Radio',
    props: [
      { name: 'label', type: 'string', description: 'Label rendered next to the radio.' },
      { name: 'helperText', type: 'string', description: 'Supplementary text below the label.' },
      { name: 'error', type: 'string | boolean', description: 'Error state message or styling.' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Prevents interaction.' },
    ],
    knobs: [
      { name: 'label', type: 'text', default: 'Option 1' },
      { name: 'error', type: 'text', default: '' },
      { name: 'disabled', type: 'boolean', default: false },
    ],
  },
  {
    slug: 'switch',
    name: 'Switch',
    description: 'A control that allows the user to toggle between on and off.',
    category: 'Forms',
    importName: 'Switch',
    props: [
      { name: 'label', type: 'string', description: 'Label rendered next to the switch.' },
      { name: 'helperText', type: 'string', description: 'Supplementary text below the label.' },
      { name: 'error', type: 'string | boolean', description: 'Error state message or styling.' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Prevents interaction.' },
      { name: 'checked', type: 'boolean', description: 'Controlled checked state of the switch.' },
    ],
    knobs: [
      { name: 'label', type: 'text', default: 'Enable notifications' },
      { name: 'error', type: 'text', default: '' },
      { name: 'disabled', type: 'boolean', default: false },
    ],
  },
  {
    slug: 'select',
    name: 'Select',
    description: 'Displays a list of options for the user to pick from.',
    category: 'Forms',
    importName: 'Select',
    props: [
      { name: 'label', type: 'string', description: 'Accessible label rendered above the select.' },
      { name: 'error', type: 'string | boolean', description: 'Error state message or styling.' },
      { name: 'helperText', type: 'string', description: 'Supplementary text below the select.' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Prevents interaction.' },
      { name: 'children', type: 'ReactNode', description: 'The options rendered inside the select.' },
    ],
    knobs: [
      { name: 'label', type: 'text', default: 'Country' },
      { name: 'error', type: 'text', default: '' },
      { name: 'disabled', type: 'boolean', default: false },
    ],
  },
  {
    slug: 'dialog',
    name: 'Dialog',
    description: 'A modal window that overlays either the primary window or another dialog window.',
    category: 'Feedback',
    importName: 'Dialog',
    props: [
      { name: 'open', type: 'boolean', description: 'Controlled open state.' },
      { name: 'onClose', type: 'function', description: 'Callback fired when the dialog should close.' },
      { name: 'size', type: "'sm' | 'md' | 'lg' | 'xl' | 'full'", default: "'md'", description: 'Maximum width of the dialog.' },
      { name: 'closeOnOverlay', type: 'boolean', default: 'true', description: 'Closes dialog when clicking overlay.' },
      { name: 'closeOnEscape', type: 'boolean', default: 'true', description: 'Closes dialog when pressing Escape.' },
    ],
    knobs: [
      { name: 'size', type: 'select', options: ['sm', 'md', 'lg', 'xl', 'full'], default: 'md' },
      { name: 'closeOnOverlay', type: 'boolean', default: true },
    ],
  },
  {
    slug: 'toast',
    name: 'Toast',
    description: 'A succinct message that is displayed temporarily.',
    category: 'Feedback',
    importName: 'Toast',
    props: [
      { name: 'type', type: "'info' | 'success' | 'warning' | 'error'", default: "'info'", description: 'Visual intent of the toast.' },
      { name: 'title', type: 'string', description: 'Primary title.' },
      { name: 'message', type: 'string', description: 'Sub-message or description.' },
      { name: 'duration', type: 'number', default: '5000', description: 'Milliseconds before auto-dismissal. 0 to disable.' },
      { name: 'onClose', type: 'function', description: 'Callback fired when dismissed.' },
    ],
    knobs: [
      { name: 'type', type: 'select', options: ['info', 'success', 'warning', 'error'], default: 'info' },
      { name: 'title', type: 'text', default: 'Profile Updated' },
      { name: 'duration', type: 'select', options: ['3000', '5000', '0'], default: '5000' },
    ],
  },
  {
    slug: 'accordion',
    name: 'Accordion',
    description: 'A vertically stacked set of interactive headings that each reveal a section of content.',
    category: 'Data Display',
    importName: 'Accordion',
    props: [
      { name: 'items', type: 'AccordionItem[]', description: 'Array of items containing title, content, and disabled state.' },
      { name: 'variant', type: "'default' | 'bordered' | 'separated'", default: "'default'", description: 'Visual style of the accordion.' },
      { name: 'multiple', type: 'boolean', default: 'false', description: 'Allows multiple items to be open at once.' },
    ],
    knobs: [
      { name: 'variant', type: 'select', options: ['default', 'bordered', 'separated'], default: 'default' },
      { name: 'multiple', type: 'boolean', default: false },
      { name: 'disabled', type: 'boolean', default: false },
    ],
  },
]

export function getComponentBySlug(slug: string): ComponentMeta | undefined {
  return componentRegistry.find((c) => c.slug === slug)
}
