// src/utils/session.server.ts

import { createCookieSessionStorage } from '@remix-run/node'

// 세션 스토리지 생성
const { getSession, commitSession, destroySession } =
  createCookieSessionStorage({
    cookie: {
      name: 'session',
      secure: true,
      httpOnly: true,
      path: '/',
      sameSite: 'lax',
      maxAge: 3600, // 1시간
    },
  })

export { getSession, commitSession, destroySession }
