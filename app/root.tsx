import { LinksFunction } from '@remix-run/node'
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react'
import stylesheet from '~/tailwind.css?url'
import BottomTab from './components/bottom-tab'

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: stylesheet },
]

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="bg-[#404040]">
        <div id="desktopSideBanner">
          <div className="absolute top-[50%] right-[100%] mx-36 translate-y-[-50%] cursor-pointer">
            <div className="bg-white w-40 h-[520px]">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Repudiandae aperiam esse maiores ab nisi dolores ut veniam nulla
              fuga omnis reprehenderit beatae iusto quod provident, ipsa iste
              odit repellat sit.
            </div>
          </div>
          <div className="absolute top-[50%] left-[100%] mx-36 translate-y-[-50%] cursor-pointer">
            <div className="bg-white w-40 h-[520px]">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Voluptatem explicabo omnis sunt itaque eligendi, maiores
              asperiores beatae labore repellendus minus debitis qui. Dolores
              blanditiis deleniti vitae temporibus, cumque placeat consequatur.
            </div>
          </div>
          <div className="relative min-h-screen">{children}</div>
        </div>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function App() {
  return (
    <>
      <Outlet />
      <BottomTab />
    </>
  )
}
