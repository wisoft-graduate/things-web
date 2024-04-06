import type { MetaFunction } from '@remix-run/node'

export const meta: MetaFunction = () => {
  return [
    { title: 'Things: My Page' },
    { name: 'description', content: 'Welcome to Things!' },
  ]
}

export default function Index() {
  return (
    <div className="">
      <h1>my</h1>
    </div>
  )
}
