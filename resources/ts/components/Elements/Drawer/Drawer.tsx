import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import * as React from 'react'
import 'intersection-observer'
import tw, { css } from 'twin.macro'
import { cx, css as emotionCss } from '@emotion/css'

const sizes = {
  sm: tw`max-w-md`,
  md: tw`max-w-xl`,
  lg: tw`max-w-3xl`,
  xl: tw`max-w-7xl`,
  full: tw`max-w-full`,
}

export type DrawerProps = {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
  renderFooter: () => React.ReactNode
  size?: keyof typeof sizes
}

export const Drawer = ({
  title,
  children,
  isOpen,
  onClose,
  renderFooter,
  size = 'md',
}: DrawerProps) => {
  return (
    <Transition.Root show={isOpen} as={React.Fragment}>
      <Dialog as="div" static css={drawer} open={isOpen} onClose={onClose}>
        <div css={drawer2}>
          <Dialog.Overlay css={drawerOverlay} />
          <div css={drawer3}>
            <Transition.Child as={React.Fragment} {...drawerTransitionProps}>
              <div css={drawerTransitionChild(size)}>
                <div css={drawerTransitionChild2}>
                  <div css={drawerTransitionChild3}>
                    <div css={drawerTransitionChild5}>
                      <div css={drawerTransitionChild6}>
                        <Dialog.Title css={drawerDialogTitle}>
                          {title}
                        </Dialog.Title>
                        <div css={drawerTransitionChild8}>
                          <button css={drawerButton} onClick={onClose}>
                            <span css={drawerButtonSpan}>Close panel</span>
                            <XMarkIcon
                              css={drawerButtonIcon}
                              aria-hidden="true"
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div css={drawerTransitionChild7}>{children}</div>
                  </div>
                  <div css={drawerTransitionChild4}>{renderFooter()}</div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

const drawerTransitionProps = {
  enter: cx(
    emotionCss(
      tw`transform transition ease-in-out duration-300 sm:duration-300`,
    ),
  ),
  enterFrom: cx(emotionCss(tw`translate-x-full`)),
  enterTo: cx(emotionCss(tw`translate-x-0`)),
  leave: cx(
    emotionCss(
      tw`transform transition ease-in-out duration-300 sm:duration-300`,
    ),
  ),
  leaveFrom: cx(emotionCss(tw`translate-x-0`)),
  leaveTo: cx(emotionCss(tw`translate-x-full`)),
}

const drawer = css`
  ${tw`fixed inset-0 overflow-hidden z-40`}
`

const drawer2 = css`
  ${tw`absolute inset-0 overflow-hidden`}
`

const drawer3 = css`
  ${tw`fixed inset-y-0 right-0 pl-10 max-w-full flex`}
`

const drawerOverlay = css`
  ${tw`absolute inset-0`}
`

const drawerTransitionChild = (size: keyof typeof sizes) => css`
  ${tw`w-screen`}
  ${sizes[size]}
`

const drawerTransitionChild2 = css`
  ${tw`h-full divide-y divide-gray-200 flex flex-col bg-white shadow-xl`}
`

const drawerTransitionChild3 = css`
  ${tw`min-h-0 flex-1 flex flex-col py-6 overflow-y-scroll`}
`

const drawerTransitionChild4 = css`
  ${tw`shrink-0 px-4 py-4 flex justify-end space-x-2`}
`

const drawerTransitionChild5 = css`
  ${tw`px-4 sm:px-6`}
`

const drawerTransitionChild6 = css`
  ${tw`flex items-start justify-between`}
`

const drawerTransitionChild7 = css`
  ${tw`mt-6 relative flex-1 px-4 sm:px-6`}
`

const drawerTransitionChild8 = css`
  ${tw`ml-3 h-7 flex items-center`}
`

const drawerDialogTitle = css`
  ${tw`text-lg font-medium text-gray-900`}
`

const drawerButton = css`
  ${tw`bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
`

const drawerButtonSpan = css`
  ${tw`sr-only`}
`

const drawerButtonIcon = css`
  ${tw`h-6 w-6`}
`
