import type { MetaFunction } from '@remix-run/node'
import { Link } from '@remix-run/react'

export const meta: MetaFunction = () => {
  return [
    { title: 'Things' },
    { name: 'description', content: 'Welcome to Things!' },
  ]
}

export default function Index() {
  return (
    <div className="absolute flex-center flex-col h-screen w-full text-white bg-gray-800 z-50 bg-cover bg-[url('/auth-bg.png')]">
      <p className=" text-lg">안녕하세요!</p>
      <p className="text-lg">
        <span className="text-[42px]">Things</span>입니다.
      </p>
      <Link
        to={'/signin'}
        className="absolute flex-center bottom-[75px] w-[55%] h-[55px] bg-[#CBF147] bg-opacity-25 hover:bg-opacity-40 transition duration-300 ease-in-out border-point-green border-[1px] rounded-full"
      >
        로그인
      </Link>
      <Link
        to={'/signup'}
        className="absolute flex-center bottom-[155px] w-[55%] h-[55px] bg-[#CBF147] bg-opacity-25 hover:bg-opacity-40 transition duration-300 ease-in-out border-point-green border-[1px] rounded-full"
      >
        회원가입
      </Link>
    </div>
  )
}
