import type { MetaFunction } from '@remix-run/node'

export const meta: MetaFunction = () => {
  return [
    { title: 'Things' },
    { name: 'description', content: 'Welcome to Things!' },
  ]
}

export default function Index() {
  return (
    <div className="">
      <h1>remix test</h1>
    </div>
  )
}
