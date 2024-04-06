import type { MetaFunction } from '@remix-run/node'
import { Link, Form, json } from '@remix-run/react'
import { useState } from 'react'

import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { getValidatedFormData, useRemixForm } from 'remix-hook-form'

export const meta: MetaFunction = () => {
  return [
    { title: 'Things' },
    { name: 'description', content: 'Welcome to Things!' },
  ]
}

const signinSchema = zod.object({
  id: zod.string().min(4),
  password: zod.string().min(4),
})

type FormData = zod.infer<typeof signinSchema>

const resolver = zodResolver(signinSchema)

export const action = async ({ request }: ActionFuctionArgs) => {
  const { data } = await getValidatedFormData<FormData>(request, resolver)

  // axios
  console.log(data)

  return json(data)
}

export default function Auth() {
  const {
    getValues,
    handleSubmit,
    formState: { errors },
    register,
  } = useRemixForm<FormData>({
    mode: 'onSubmit',
    resolver,
  })

  const [isLoginOpen, setIsLoginOpen] = useState(false)

  const toggleLoginButton = () => {
    setIsLoginOpen(!isLoginOpen)
  }

  return (
    <div className="absolute flex-center flex-col h-screen w-full text-white bg-gray-800 z-50 bg-cover bg-[url('/auth-bg.png')]">
      <p className=" text-lg">안녕하세요!</p>
      <p className="text-lg">
        <span className="text-[42px]">Things</span>입니다.
      </p>
      <button
        onClick={toggleLoginButton}
        className="absolute flex-center bottom-[75px] w-[55%] h-[55px] bg-[#CBF147] bg-opacity-25 hover:bg-opacity-40 transition duration-300 ease-in-out border-point-green border-[1px] rounded-full"
      >
        로그인
      </button>

      {isLoginOpen && (
        <div className="flex-center flex-col w-full layer popup text-black bg-white h-[60%] animate-slide-up !top-auto overflow-hidden full rounded-t-[30px] p-8">
          <button
            className="absolute top-10 right-10"
            onClick={toggleLoginButton}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19.7081 18.2921C19.801 18.385 19.8747 18.4953 19.9249 18.6167C19.9752 18.7381 20.0011 18.8682 20.0011 18.9996C20.0011 19.131 19.9752 19.2611 19.9249 19.3825C19.8747 19.5039 19.801 19.6142 19.7081 19.7071C19.6151 19.8 19.5048 19.8737 19.3835 19.924C19.2621 19.9743 19.132 20.0001 19.0006 20.0001C18.8692 20.0001 18.7391 19.9743 18.6177 19.924C18.4963 19.8737 18.386 19.8 18.2931 19.7071L10.0006 11.4133L1.70806 19.7071C1.52042 19.8947 1.26592 20.0001 1.00056 20.0001C0.735192 20.0001 0.480697 19.8947 0.293056 19.7071C0.105415 19.5194 5.23096e-09 19.2649 0 18.9996C-5.23096e-09 18.7342 0.105415 18.4797 0.293056 18.2921L8.58681 9.99958L0.293056 1.70708C0.105415 1.51944 -1.97712e-09 1.26494 0 0.999579C1.97712e-09 0.734215 0.105415 0.47972 0.293056 0.292079C0.480697 0.104439 0.735192 -0.000976561 1.00056 -0.000976562C1.26592 -0.000976564 1.52042 0.104439 1.70806 0.292079L10.0006 8.58583L18.2931 0.292079C18.4807 0.104439 18.7352 -0.000976568 19.0006 -0.000976562C19.2659 -0.000976557 19.5204 0.104439 19.7081 0.292079C19.8957 0.47972 20.0011 0.734215 20.0011 0.999579C20.0011 1.26494 19.8957 1.51944 19.7081 1.70708L11.4143 9.99958L19.7081 18.2921Z"
                fill="#111111"
              />
            </svg>
          </button>
          <h1 className="text-[38px]">LOGIN</h1>
          <Form onSubmit={handleSubmit} className="flex-center flex-col w-full">
            <div className="flex w-[80%] border rounded-full mt-10 px-4 py-3 mb-6">
              <input
                type="text"
                {...register('id')}
                className="placeholder-[#767676] outline-none flex-grow ml-4 py-2"
                placeholder="로그인 아이디..."
              />
            </div>

            <div className="flex border w-[80%] rounded-full mt-1 px-4 py-3 mb-6">
              <input
                type="password"
                {...register('password')}
                className="placeholder-[#767676] outline-none flex-grow ml-4 py-2"
                placeholder="패스워드..."
              />
            </div>

            <button
              type="submit"
              className="flex-center text-[#111111] bg-point-green rounded-full w-[80%] p-5 drop-shadow-xl mb-8"
            >
              로그인
            </button>
            <button className="text-[#767676] underline">비밀번호 찾기</button>
          </Form>
        </div>
      )}

      <Link
        to={'/signup'}
        className="absolute flex-center bottom-[155px] w-[55%] h-[55px] bg-[#CBF147] bg-opacity-25 hover:bg-opacity-40 transition duration-300 ease-in-out border-point-green border-[1px] rounded-full"
      >
        회원가입
      </Link>
    </div>
  )
}
