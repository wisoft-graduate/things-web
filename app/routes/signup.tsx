import type { MetaFunction } from '@remix-run/node'
import { Link, Form, json } from '@remix-run/react'
import { SetStateAction, useState } from 'react'

import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { getValidatedFormData, useRemixForm } from 'remix-hook-form'
import axios from 'axios'

export const meta: MetaFunction = () => {
  return [
    { title: 'Things' },
    { name: 'description', content: 'Welcome to Things!' },
  ]
}

const schema = zod
  .object({
    id: zod.string().min(4),
    nickname: zod.string().min(4),
    password: zod.string().min(4),
    confirmPassword: zod.string().min(4),
    identityVerificationQuestion: zod.string().min(1),
    identityVerificationAnswer: zod.string().min(1),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })

type FormData = zod.infer<typeof schema>

const resolver = zodResolver(schema)

export const action = async ({ request }: ActionFuctionArgs) => {
  const { data } = await getValidatedFormData<FormData>(request, resolver)

  // axios
  console.log(data)

  return json(data)
}

export default function SignUp() {
  const {
    getValues,
    handleSubmit,
    formState: { errors },
    register,
  } = useRemixForm<FormData>({
    mode: 'onSubmit',
    resolver,
  })

  const [isDuplicateId, setIsDuplicateId] = useState('')
  const [isDuplicateNickname, setIsDuplicateNickname] = useState('')
  const [isInvalidPassword, setIsInvalidPassword] = useState(false)

  const handlePasswordBlur = () => {
    if (
      getValues('confirmPassword') &&
      getValues('password') != getValues('confirmPassword')
    ) {
      setIsInvalidPassword(true)
    } else {
      setIsInvalidPassword(false)
    }
  }

  const handleDuplicateIdCheck = () => {
    getValues('id') === 'duplicate'
      ? setIsDuplicateId('true')
      : setIsDuplicateId('false')
  }

  const handleDuplicateNicknameCheck = () => {
    getValues('nickname') === 'duplicate'
      ? setIsDuplicateNickname('true')
      : setIsDuplicateNickname('false')
  }

  return (
    <div className="absolute sm:p-20 p-4 h-screen w-full text-black bg-white z-50">
      <Link to="/quotes" className="absolute right-10">
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
      </Link>
      <span className="relative">
        <span className="relative text-[42px] z-10">회원가입</span>
        <span className="absolute top-[-10px] left-0 w-full h-[30px] bg-[#CBF147] opacity-100 z-0"></span>
      </span>
      <span>을 환영합니다!</span>
      <p className="text-[#767676]">Things에서 사용할 정보를 입력해주세요.</p>
      <div>
        <Form onSubmit={handleSubmit} className="p-4">
          <div
            className={`flex border rounded-full mt-16 px-4 py-3
        ${
          isDuplicateId == 'true'
            ? 'border-red-500'
            : isDuplicateId == 'false'
            ? 'border-green-500'
            : ''
        }`}
          >
            <input
              type="text"
              {...register('id')}
              required
              className="placeholder-[#767676] outline-none flex-grow ml-4"
              placeholder="로그인 아이디..."
            />
            {errors.id && <p>{errors.id.message}</p>}
            <button
              type="button"
              onClick={handleDuplicateIdCheck}
              className="text-[#767676] underline py-2 px-4"
            >
              중복 확인
            </button>
          </div>
          {isDuplicateId == '' && <div className="h-[24px]" />}
          {isDuplicateId == 'true' && (
            <p className="text-red-500 text-sm ml-6 mt-1">
              중복되는 아이디입니다.
            </p>
          )}
          {isDuplicateId == 'false' && (
            <p className="text-green-500 text-sm ml-6 mt-1">
              사용 가능한 아이디입니다.
            </p>
          )}

          <div
            className={`flex border rounded-full px-4 py-3
        ${
          isDuplicateNickname == 'true'
            ? 'border-red-500'
            : isDuplicateNickname == 'false'
            ? 'border-green-500'
            : ''
        }`}
          >
            <input
              type="text"
              required
              {...register('nickname')}
              className="placeholder-[#767676] outline-none flex-grow ml-4"
              placeholder="닉네임..."
            />
            {errors.nickname && <p>{errors.nickname.message}</p>}
            <button
              onClick={handleDuplicateNicknameCheck}
              className="text-[#767676] underline py-2 px-4"
            >
              중복 확인
            </button>
          </div>
          {isDuplicateNickname == '' && (
            <p className="text-[#767676] text-sm ml-6 mt-1">
              ※ 영어(대문자,소문자), 한글, 숫자만 가능
            </p>
          )}
          {isDuplicateNickname == 'true' && (
            <p className="text-red-500 text-sm ml-6 mt-1">
              중복되는 닉네임입니다.
            </p>
          )}
          {isDuplicateNickname == 'false' && (
            <p className="text-green-500 text-sm ml-6 mt-1">
              사용 가능한 닉네임입니다.
            </p>
          )}

          <div
            className={`flex border rounded-full mt-1 px-4 py-3
            ${isInvalidPassword ? 'border-red-500' : ''}`}
          >
            <input
              type="password"
              required
              {...register('password')}
              onBlur={handlePasswordBlur}
              className="placeholder-[#767676] outline-none flex-grow ml-4 py-2"
              placeholder="패스워드..."
            />
            {errors.password && <p>{errors.password.message}</p>}
          </div>

          <div
            className={`flex border rounded-full mt-6 px-4 py-3 
        ${isInvalidPassword ? 'border-red-500' : ''}`}
          >
            <input
              type="password"
              required
              {...register('confirmPassword')}
              onBlur={handlePasswordBlur}
              className="placeholder-[#767676] outline-none flex-grow ml-4 py-2"
              placeholder="패스워드 확인..."
            />
          </div>
          {!isInvalidPassword && <div className="h-[24px]" />}
          {isInvalidPassword && (
            <p className="text-red-500 text-sm ml-6 mt-1">
              패스워드가 일치하지 않습니다.
            </p>
          )}

          <div className="flex border rounded-full px-4 py-4">
            <select
              {...register('identityVerificationQuestion')}
              className="outline-none bg-transparent flex-grow h-8 mx-2 overflow-auto text-[#767676]"
            >
              {errors.identityVerificationQuestion && (
                <p>{errors.identityVerificationQuestion.message}</p>
              )}
              <option value="" disabled hidden selected>
                본인 확인 질문 선택...
              </option>
              <option value="최근 참여한 활동 중 하나는 어떤 것인가요?">
                최근 참여한 활동 중 하나는 어떤 것인가요?
              </option>
              <option value="가족 중 한명의 이름은 무엇이고, 어떤 관계인가요?">
                가족 중 한명의 이름은 무엇이고, 어떤 관계인가요?
              </option>
              <option value="최근 구매한 제품 하나는 무엇인가요?">
                최근 구매한 제품 하나는 무엇인가요?
              </option>
              <option value="최근 3년 내에 거주한 주소 중 하나는 무엇인가요?">
                최근 3년 내에 거주한 주소 중 하나는 무엇인가요?
              </option>
              <option value="최근 통화한 연락처 중 하나는 누구인가요?">
                최근 통화한 연락처 중 하나는 누구인가요?
              </option>
            </select>
          </div>
          <div className="flex border rounded-full mt-6 px-4 py-3">
            <input
              type="text"
              required
              {...register('identityVerificationAnswer')}
              className="placeholder-[#767676] outline-none flex-grow ml-4 py-2"
              placeholder="본인 확인 답변 입력..."
            />
            {errors.identityVerificationAnswer && (
              <p>{errors.identityVerificationAnswer.message}</p>
            )}
          </div>

          <button
            type="submit"
            className={`flex-center bg-[#dddddd] rounded-full w-full mt-6 p-5
            ${isInvalidPassword ? 'border-red-500' : ''}`}
          >
            확인
          </button>
        </Form>
      </div>
    </div>
  )
}
