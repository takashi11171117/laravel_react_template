import {
  ExclamationCircleIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/outline'
import * as React from 'react'
import tw, { css } from 'twin.macro'

import { Button } from '@/components/Elements/Button'
import { Dialog, DialogTitle } from '@/components/Elements/Dialog'
import { useDisclosure } from '@/hooks/useDisclosure'

export type ConfirmationDialogProps = {
  triggerButton: React.ReactElement
  confirmButton: React.ReactElement
  title: string
  body?: string
  cancelButtonText?: string
  icon?: 'danger' | 'info'
  isDone?: boolean
}

export const ConfirmationDialog = ({
  triggerButton,
  confirmButton,
  title,
  body = '',
  cancelButtonText = 'Cancel',
  icon = 'danger',
  isDone = false,
}: ConfirmationDialogProps) => {
  const { close, open, isOpen } = useDisclosure()

  const cancelButtonRef = React.useRef(null)

  React.useEffect(() => {
    if (isDone) {
      close()
    }
  }, [isDone, close])

  const trigger = React.cloneElement(triggerButton, {
    onClick: open,
  })

  return (
    <>
      {trigger}
      <Dialog isOpen={isOpen} onClose={close} initialFocus={cancelButtonRef}>
        <div css={dialog}>
          <div css={dialog2}>
            {icon === 'danger' && (
              <div css={dialogDanger}>
                <ExclamationCircleIcon
                  css={dialogDangerIcon}
                  aria-hidden="true"
                />
              </div>
            )}

            {icon === 'info' && (
              <div css={dialogInfo}>
                <InformationCircleIcon
                  css={dialogInfoIcon}
                  aria-hidden="true"
                />
              </div>
            )}
            <div css={dialog4}>
              <DialogTitle as="h3" css={dialogTitle}>
                {title}
              </DialogTitle>
              {body && (
                <div css={dialogBody}>
                  <p css={dialogBody2}>{body}</p>
                </div>
              )}
            </div>
          </div>
          <div css={dialog3}>
            <Button
              type="button"
              variant="inverse"
              css={dialogButton}
              onClick={close}
              ref={cancelButtonRef}>
              {cancelButtonText}
            </Button>
            {confirmButton}
          </div>
        </div>
      </Dialog>
    </>
  )
}

const dialog = css`
  ${tw`inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6`}
`

const dialog2 = css`
  ${tw`sm:flex sm:items-start`}
`

const dialog3 = css`
  ${tw`mt-4 flex space-x-2 justify-end`}
`

const dialog4 = css`
  ${tw`mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left`}
`

const dialogTitle = css`
  ${tw`text-lg leading-6 font-medium text-gray-900`}
`

const dialogBody = css`
  ${tw`mt-2`}
`

const dialogBody2 = css`
  ${tw`text-sm text-gray-500`}
`

const dialogButton = css`
  ${tw`w-full inline-flex justify-center rounded-md border focus:ring-1 focus:ring-offset-1 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm`}
`

const dialogDanger = css``

const dialogDangerIcon = css`
  ${tw`h-6 w-6 text-red-600`}
`

const dialogInfo = css`
  ${tw`mx-auto shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10`}
`

const dialogInfoIcon = css`
  ${tw`h-6 w-6 text-blue-600`}
`
