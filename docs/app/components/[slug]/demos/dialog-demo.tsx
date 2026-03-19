'use client'

import * as React from 'react'
import { Dialog, DialogHeader, DialogBody, DialogFooter, Button } from 'kalki-design'
import { ComponentPreview } from '@/app/components/component-preview'
import type { ComponentMeta } from '@/lib/component-registry'

export function DialogDemo({ meta }: { meta: ComponentMeta }) {
  const [open, setOpen] = React.useState(false)

  return (
    <ComponentPreview
      meta={meta}
      defaultChildren=""
      renderPreview={(props) => (
        <>
          <Button onClick={() => setOpen(true)}>Open Dialog</Button>
          <Dialog
            open={open}
            onClose={() => setOpen(false)}
            size={(props.size as 'sm' | 'md' | 'lg' | 'xl' | 'full') || 'md'}
            closeOnOverlay={props.closeOnOverlay as boolean}
            closeOnEscape={true}
          >
            <DialogHeader>
              <h3 className="text-lg font-semibold tracking-tight">Edit Profile</h3>
              <p className="text-sm text-muted-foreground">
                Make changes to your profile here. Click save when you're done.
              </p>
            </DialogHeader>
            <DialogBody>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="name" className="text-right text-sm font-medium">Name</label>
                  <input
                    id="name"
                    defaultValue="Pedro Duarte"
                    className="col-span-3 flex h-8 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="username" className="text-right text-sm font-medium">Username</label>
                  <input
                    id="username"
                    defaultValue="@peduarte"
                    className="col-span-3 flex h-8 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
              </div>
            </DialogBody>
            <DialogFooter>
              <Button variant="primary" onClick={() => setOpen(false)}>Save changes</Button>
            </DialogFooter>
          </Dialog>
        </>
      )}
    />
  )
}
