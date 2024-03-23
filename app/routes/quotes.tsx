import type { MetaFunction } from '@remix-run/node'

export const meta: MetaFunction = () => {
  return [
    { title: 'Things' },
    { name: 'description', content: 'Welcome to Things!' },
  ]
}

export default function Quotes() {
  return (
    <div className="bg-green-600">
      <div className="h-screen bg-cover bg-[url('/edison.jpg')]"></div>
    </div>
  )
}
