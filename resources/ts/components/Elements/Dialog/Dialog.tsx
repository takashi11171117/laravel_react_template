import { Dialog as UIDialog, Transition } from '@headlessui/react'
import * as React from 'react'
import 'intersection-observer'
import tw, { css } from 'twin.macro'
import { cx, css as emotionCss } from '@emotion/css'

type DialogProps = {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  initialFocus?: React.MutableRefObject<null>
}

export const DialogTitle = UIDialog.Title

export const DialogDescription = UIDialog.Description

export const Dialog = ({
  isOpen,
  onClose,
  children,
  initialFocus,
}: DialogProps) => {
  return (
    <>
      <Transition show={isOpen} as={React.Fragment}>
        <UIDialog
          as="div"
          static
          css={dialog}
          open={isOpen}
          onClose={onClose}
          initialFocus={initialFocus}>
          <div css={dialog2}>
            <Transition.Child as={React.Fragment} {...dialogTransitionProps}>
              <UIDialog.Overlay css={dialogOverlay} />
            </Transition.Child>

            <span css={dialogSpan} aria-hidden="true">
              &#8203;
            </span>
            <Transition.Child as={React.Fragment} {...dialogTransitionProps2}>
              {children}
            </Transition.Child>
          </div>
        </UIDialog>
      </Transition>
    </>
  )
}

const dialog = css`
  ${tw`fixed z-10 inset-0 overflow-y-auto`}
`

const dialog2 = css`
  ${tw`flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0`}
`

const dialogOverlay = css`
  ${tw`fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity`}
`

const dialogSpan = css`
  ${tw`hidden sm:inline-block sm:align-middle sm:h-screen`}
`

const dialogTransitionProps = {
  enter: cx(emotionCss(tw`ease-out duration-300`)),
  enterFrom: cx(emotionCss(tw`opacity-0`)),
  enterTo: cx(emotionCss(tw`opacity-100`)),
  leave: cx(emotionCss(tw`ease-in duration-200`)),
  leaveFrom: cx(emotionCss(tw`opacity-100`)),
  leaveTo: cx(emotionCss(tw`opacity-0`)),
}

const dialogTransitionProps2 = {
  enter: cx(emotionCss(tw`ease-out duration-300`)),
  enterFrom: cx(
    emotionCss(tw`opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95`),
  ),
  enterTo: cx(emotionCss(tw`opacity-100 translate-y-0 sm:scale-100`)),
  leave: cx(emotionCss(tw`ease-in duration-200`)),
  leaveFrom: cx(emotionCss(tw`opacity-100 translate-y-0 sm:scale-100`)),
  leaveTo: cx(
    emotionCss(tw`opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95`),
  ),
}
