import type { MetaFunction } from '@remix-run/node'
import { Link, Form } from '@remix-run/react'
import { useState } from 'react'
import { redirectWithSuccess } from 'remix-toast'

import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { getValidatedFormData, useRemixForm } from 'remix-hook-form'
import axios from '../api/axios'

export const meta: MetaFunction = () => {
  return [
    { title: 'Things' },
    { name: 'description', content: 'Welcome to Things!' },
  ]
}

const signupSchema = zod
  .object({
    id: zod
      .string()
      .min(5, '로그인 아이디는 최소 5자 이상이어야 합니다.')
      .max(20, '로그인 아이디는 최대 20자 이하여야 합니다.')
      .regex(/^[a-z0-9]+$/, '로그인 아이디는 영어 소문자와 숫자만 가능합니다.'),
    nickname: zod
      .string()
      .min(3, '문자열은 최소 3자 이상이어야 합니다.')
      .max(20, '문자열은 최대 20자 이하여야 합니다.')
      .regex(/^(?!leaved_)[\w-,_가-힣]+$/, '사용할 수 없는 닉네임입니다.'),
    password: zod
      .string()
      .min(8, '비밀번호는 최소 8자 이상이어야 합니다.')
      .max(16, '비밀번호는 최대 16자 이하여야 합니다.')
      .regex(
        /^(?=.*[a-z])(?=.*\d)[a-zA-Z\d!@#$]+$/,
        '비밀번호는 소문자 알파벳과 숫자를 포함하는 조합이어야 합니다.'
      ),
    confirmPassword: zod.string().min(8).max(16),
    identityVerificationQuestion: zod
      .string()
      .min(1, '본인 확인 질문을 선택하세요.'),
    identityVerificationAnswer: zod
      .string()
      .min(1, '본인 확인 답변을 입력하세요.'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '패스워드가 일치하지 않습니다.',
    path: ['password'],
  })

type FormData = zod.infer<typeof signupSchema>

const resolver = zodResolver(signupSchema)

export const action = async ({ request }: ActionFuctionArgs) => {
  const { data } = await getValidatedFormData<FormData>(request, resolver)

  try {
    await axios.post('/users', {
      id: data?.id,
      password: data?.password,
      nickname: data?.nickname,
      identityVerificationQuestion: data?.identityVerificationQuestion,
      identityVerificationAnswer: data?.identityVerificationAnswer,
    })
    return redirectWithSuccess(
      '/auth',
      '회원가입이 완료되었습니다. 로그인 해주세요.'
    )
  } catch (error) {
    console.error(error)
  }
}

export default function SignUp() {
  const {
    watch,
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

  const formCompleted = watch([
    'id',
    'nickname',
    'password',
    'confirmPassword',
    'identityVerificationQuestion',
    'identityVerificationAnswer',
  ])

  const questions = [
    '가장 좋아하는 동물은 무엇인가요?',
    '어머니의 출신 지역은 어디인가요?',
    '가장 좋아하는 음식은 무엇인가요?',
    '최초로 방문한 국가는 어디인가요?',
    '어릴 때 가장 친한 친구의 이름은 무엇인가요?',
    '어머니의 소녀시절 별명은 무엇인가요?',
    '첫 번째 애완 동물의 이름은 무엇인가요?',
    '출생 도시는 어디인가요?',
    '자신이 졸업한 초등학교의 이름은 무엇인가요?',
    '가장 기억에 남는 여행 경험은 무엇이었나요?',
    '어릴 적 꿈이 무엇이었나요?',
    '첫 번째 사귄 연인의 이름은 무엇이었나요?',
    '가장 기억에 남는 선물은 무엇이었나요?',
    '가장 인상 깊었던 책의 제목은 무엇인가요?',
    '자신이 가장 좋아하는 스포츠 팀은 어디인가요?',
    '가장 기억에 남는 영화는 무엇이었나요?',
    '자신의 어린 시절 가장 큰 꿈은 무엇이었나요?',
    '최근에 가장 좋아하는 노래는 무엇인가요?',
  ]

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
      <Link to="/auth" className="absolute right-10">
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
          errors.id || isDuplicateId == 'true'
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
              onChange={() => setIsDuplicateId('')}
              className="placeholder-[#767676] outline-none flex-grow ml-4"
              placeholder="로그인 아이디..."
            />

            <button
              type="button"
              onClick={handleDuplicateIdCheck}
              className="text-[#767676] underline py-2 px-4"
            >
              중복 확인
            </button>
          </div>
          {errors.id && isDuplicateId == '' && (
            <p className="text-red-500 text-sm ml-6 mt-1">
              {errors.id.message}
            </p>
          )}

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
              ※ 영어, 한글, 특수문자(-, _), 숫자만 가능
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
            ${errors.password ? 'border-red-500' : ''}`}
          >
            <input
              type="password"
              required
              {...register('password')}
              className="placeholder-[#767676] outline-none flex-grow ml-4 py-2"
              placeholder="패스워드..."
            />
          </div>

          <div
            className={`flex border rounded-full mt-6 px-4 py-3 
        ${errors.password ? 'border-red-500' : ''}`}
          >
            <input
              type="password"
              required
              {...register('confirmPassword')}
              className="placeholder-[#767676] outline-none flex-grow ml-4 py-2"
              placeholder="패스워드 확인..."
            />
          </div>
          {!errors.password && <div className="h-[24px]" />}
          {errors.password && (
            <p className="text-red-500 text-sm ml-6 mt-1">
              {errors.password.message}
            </p>
          )}

          <div className="flex border rounded-full px-4 py-4">
            <select
              {...register('identityVerificationQuestion')}
              className="outline-none bg-transparent flex-grow h-8 w-12 mx-2 overflow-auto text-[#767676]"
            >
              {errors.identityVerificationQuestion && (
                <p>{errors.identityVerificationQuestion.message}</p>
              )}
              <option value="" disabled hidden selected>
                본인 확인 질문 선택...
              </option>
              {questions.map((question) => (
                <option key={question} value={question}>
                  {question}
                </option>
              ))}
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
            ${
              watch('id') &&
              watch('nickname') &&
              watch('password') &&
              watch('confirmPassword') &&
              watch('identityVerificationQuestion') &&
              watch('identityVerificationAnswer')
                ? 'bg-point-green drop-shadow-lg transition-all duration-300 ease-in-out'
                : ''
            }`}
          >
            확인
          </button>
        </Form>
      </div>
    </div>
  )
}
