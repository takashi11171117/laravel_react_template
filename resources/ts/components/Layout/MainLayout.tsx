import { Dialog, Transition } from '@headlessui/react'
import { HomeIcon, XMarkIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import tw, { css } from 'twin.macro'
import { cx, css as emotionCss } from '@emotion/css'
import * as React from 'react'
import { NavLink } from 'react-router-dom'

type SideNavigationItem = {
  name: string
  to: string
  icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element
}

const SideNavigation = () => {
  const navigation = [
    { name: 'Dashboard', to: '/app', icon: HomeIcon },
    { name: 'Page1', to: '/app/page1', icon: HomeIcon },
    { name: 'Page2', to: '/app/page2', icon: HomeIcon },
  ] as SideNavigationItem[]

  return (
    <>
      {navigation.map((item, index) => (
        <NavLink
          end={index === 0}
          key={item.name}
          to={item.to}
          className={clsx(
            'text-gray-300 hover:bg-gray-700 hover:text-white',
            'group flex items-center px-2 py-2 text-base font-medium rounded-md',
          )}>
          <item.icon
            className={clsx(
              'text-gray-400 group-hover:text-gray-300',
              'mr-4 flex-shrink-0 h-6 w-6',
            )}
            aria-hidden="true"
          />
          {item.name}
        </NavLink>
      ))}
    </>
  )
}

type MobileSidebarProps = {
  sidebarOpen: boolean
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const MobileSidebar = ({ sidebarOpen, setSidebarOpen }: MobileSidebarProps) => {
  return (
    <Transition.Root show={sidebarOpen} as={React.Fragment}>
      <Dialog
        as="div"
        static
        css={mobileSidebarStyle1}
        open={sidebarOpen}
        onClose={setSidebarOpen}>
        <Transition.Child {...overlayTransitionProps} as={React.Fragment}>
          <Dialog.Overlay css={mobileSidebarDialogOverlay} />
        </Transition.Child>
        <Transition.Child {...contentTransitionProps1} as={React.Fragment}>
          <div css={mobileSidebarContent}>
            <Transition.Child {...contentTransitionProps2} as={React.Fragment}>
              <div css={mobileSidebarContentStyle1}>
                <button
                  css={mobileSidebarContentButton}
                  onClick={() => setSidebarOpen(false)}>
                  <span css={mobileSidebarContentButtonStyle1}>
                    Close sidebar
                  </span>
                  <XMarkIcon
                    css={mobileSidebarContentStyle2}
                    aria-hidden="true"
                  />
                </button>
              </div>
            </Transition.Child>
            <div css={mobileSidebarNav}>
              <nav css={mobileSidebarNavStyle1}>
                <SideNavigation />
              </nav>
            </div>
          </div>
        </Transition.Child>
        <div css={mobileSidebarStyle2} aria-hidden="true"></div>
      </Dialog>
    </Transition.Root>
  )
}

const mobileSidebarStyle1 = css`
  ${tw`fixed inset-0 flex z-40 md:hidden`}
`

const mobileSidebarStyle2 = css`
  ${tw`shrink-0 w-14`}
`

const mobileSidebarDialogOverlay = css`
  ${tw`fixed inset-0 bg-gray-600 bg-opacity-75`}
`

const mobileSidebarContent = css`
  ${tw`relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-gray-800`}
`

const mobileSidebarContentStyle1 = css`
  ${tw`absolute top-0 right-0 -mr-12 pt-2`}
`

const mobileSidebarContentButton = css`
  ${tw`ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white`}
`

const mobileSidebarContentButtonStyle1 = css`
  ${tw`sr-only`}
`

const mobileSidebarContentStyle2 = css`
  ${tw`h-6 w-6 text-white`}
`

const mobileSidebarNav = css`
  ${tw`mt-5 flex-1 h-0 overflow-y-auto`}
`

const mobileSidebarNavStyle1 = css`
  ${tw`px-2 space-y-1`}
`

const overlayTransitionProps = {
  enter: cx(emotionCss(tw`transition-opacity ease-linear duration-300`)),
  enterFrom: cx(emotionCss(tw`opacity-0`)),
  enterTo: cx(emotionCss(tw`opacity-100`)),
  leave: cx(emotionCss(tw`transition-opacity ease-linear duration-300`)),
  leaveFrom: cx(emotionCss(tw`opacity-100`)),
  leaveTo: cx(emotionCss(tw`opacity-0`)),
}

const contentTransitionProps1 = {
  enter: cx(emotionCss(tw`transition ease-in-out duration-300 transform`)),
  enterFrom: cx(emotionCss(tw`-translate-x-full`)),
  enterTo: cx(emotionCss(tw`translate-x-0`)),
  leave: cx(emotionCss(tw`transition ease-in-out duration-300 transform`)),
  leaveFrom: cx(emotionCss(tw`translate-x-0`)),
  leaveTo: cx(emotionCss(tw`-translate-x-full`)),
}

const contentTransitionProps2 = {
  enter: cx(emotionCss(tw`ease-in-out duration-300`)),
  enterFrom: cx(emotionCss(tw`opacity-0`)),
  enterTo: cx(emotionCss(tw`opacity-100`)),
  leave: cx(emotionCss(tw`ease-in-out duration-300`)),
  leaveFrom: cx(emotionCss(tw`opacity-100`)),
  leaveTo: cx(emotionCss(tw`opacity-0`)),
}

const Sidebar = () => {
  return (
    <div css={sidebarStyle1}>
      <div css={sidebarStyle2}>
        <div css={sidebarStyle3}>
          <div css={sidebarStyle4}>
            <nav css={sidebarStyle5}>
              <SideNavigation />
            </nav>
          </div>
        </div>
      </div>
    </div>
  )
}

const sidebarStyle1 = css`
  ${tw`hidden md:flex md:shrink-0`}
`

const sidebarStyle2 = css`
  ${tw`flex flex-col w-64`}
`

const sidebarStyle3 = css`
  ${tw`flex flex-col h-0 flex-1`}
`

const sidebarStyle4 = css`
  ${tw`flex flex-col h-0 flex-1`}
`

const sidebarStyle5 = css`
  ${tw`flex-1 px-2 py-4 bg-gray-800 space-y-1`}
`

type MainLayoutProps = {
  children: React.ReactNode
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false)

  return (
    <div css={mainLayoutStyle1}>
      <MobileSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      <Sidebar />
      <div css={mainLayoutStyle2}>
        <div css={mainLayoutStyle3}>
          <button css={mainLayoutStyle4} onClick={() => setSidebarOpen(true)}>
            <span className="sr-only">Open sidebar</span>
          </button>
        </div>
        <main css={mainLayoutMain}>{children}</main>
      </div>
    </div>
  )
}

const mainLayoutStyle1 = css`
  ${tw`h-screen flex overflow-hidden bg-gray-100`}
`

const mainLayoutStyle2 = css`
  ${tw`flex flex-col w-0 flex-1 overflow-hidden`}
`

const mainLayoutStyle3 = css`
  ${tw`relative z-10 shrink-0 flex h-16 bg-white shadow`}
`

const mainLayoutStyle4 = css`
  ${tw`px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden`}
`

const mainLayoutMain = css`
  ${tw`flex-1 relative overflow-y-auto focus:outline-none`}
`
