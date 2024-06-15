import type { MetaFunction } from '@remix-run/node'
import { useState } from 'react'

export const meta: MetaFunction = () => {
  return [
    { title: 'Things: My Page' },
    { name: 'description', content: 'Welcome to Things!' },
  ]
}

export default function My() {
  return (
    <div>
      <div className="flex-col h-full bg-white p-12 overflow-hidden">
        <div className="flex items-center">
          <p className="text-xl mr-1">test123</p>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10Z"
              fill="#CBF147"
            />
            <g clipPath="url(#clip0_899_1130)">
              <path
                d="M8.57171 13.7438L5.35742 14.6438L6.25742 11.4295L12.1431 5.57233C12.2097 5.5043 12.2891 5.45024 12.3768 5.41334C12.4645 5.37643 12.5587 5.35742 12.6539 5.35742C12.749 5.35742 12.8432 5.37643 12.9309 5.41334C13.0186 5.45024 13.098 5.5043 13.1646 5.57233L14.4288 6.84376C14.4957 6.91021 14.5488 6.98923 14.585 7.07626C14.6212 7.1633 14.6398 7.25664 14.6398 7.3509C14.6398 7.44517 14.6212 7.53851 14.585 7.62554C14.5488 7.71258 14.4957 7.7916 14.4288 7.85805L8.57171 13.7438Z"
                stroke="#222222"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_899_1130">
                <rect
                  width="10"
                  height="10"
                  fill="white"
                  transform="translate(5 5)"
                />
              </clipPath>
            </defs>
          </svg>

          <svg
            className="ml-auto mr-4"
            width="18"
            height="20"
            viewBox="0 0 18 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17.7946 14.4944C17.2743 13.5981 16.5009 11.0622 16.5009 7.75C16.5009 5.76088 15.7107 3.85322 14.3042 2.4467C12.8976 1.04018 10.99 0.25 9.00087 0.25C7.01174 0.25 5.10409 1.04018 3.69757 2.4467C2.29104 3.85322 1.50087 5.76088 1.50087 7.75C1.50087 11.0631 0.726492 13.5981 0.206179 14.4944C0.0733076 14.7222 0.00286746 14.9811 0.00196197 15.2449C0.00105647 15.5086 0.0697178 15.768 0.201022 15.9967C0.332325 16.2255 0.521629 16.4156 0.74984 16.5478C0.978052 16.6801 1.2371 16.7498 1.50087 16.75H5.3268C5.49984 17.5967 5.96001 18.3577 6.62949 18.9042C7.29897 19.4507 8.13666 19.7492 9.00087 19.7492C9.86508 19.7492 10.7028 19.4507 11.3722 18.9042C12.0417 18.3577 12.5019 17.5967 12.6749 16.75H16.5009C16.7646 16.7496 17.0235 16.6798 17.2516 16.5475C17.4796 16.4151 17.6688 16.225 17.8 15.9963C17.9312 15.7676 17.9998 15.5083 17.9988 15.2446C17.9979 14.9809 17.9274 14.7222 17.7946 14.4944ZM9.00087 18.25C8.5357 18.2499 8.08201 18.1055 7.70224 17.8369C7.32247 17.5683 7.0353 17.1886 6.88024 16.75H11.1215C10.9664 17.1886 10.6793 17.5683 10.2995 17.8369C9.91973 18.1055 9.46604 18.2499 9.00087 18.25ZM1.50087 15.25C2.22274 14.0087 3.00087 11.1325 3.00087 7.75C3.00087 6.1587 3.63301 4.63258 4.75823 3.50736C5.88344 2.38214 7.40957 1.75 9.00087 1.75C10.5922 1.75 12.1183 2.38214 13.2435 3.50736C14.3687 4.63258 15.0009 6.1587 15.0009 7.75C15.0009 11.1297 15.7771 14.0059 16.5009 15.25H1.50087Z"
              fill="black"
            />
          </svg>

          <svg
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11 14C11.7956 14 12.5587 13.6839 13.1213 13.1213C13.6839 12.5587 14 11.7956 14 11C14 10.2044 13.6839 9.44129 13.1213 8.87868C12.5587 8.31607 11.7956 8 11 8C10.2044 8 9.44129 8.31607 8.87868 8.87868C8.31607 9.44129 8 10.2044 8 11C8 11.7956 8.31607 12.5587 8.87868 13.1213C9.44129 13.6839 10.2044 14 11 14Z"
              stroke="black"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M18.622 9.395L17.525 6.745L19 5L17 3L15.265 4.483L12.558 3.37L11.935 1H9.981L9.349 3.401L6.704 4.516L5 3L3 5L4.453 6.789L3.373 9.446L1 10V12L3.401 12.656L4.516 15.3L3 17L5 19L6.791 17.54L9.397 18.612L10 21H12L12.604 18.613L15.255 17.515C15.697 17.832 17 19 17 19L19 17L17.516 15.25L18.614 12.598L21 11.978V10L18.622 9.395Z"
              stroke="black"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div className="flex p-8 items-center">
          <img
            src="https://via.placeholder.com/50"
            alt="Your Avatar"
            className="rounded-full shadow-lg w-24 h-24 mr-3"
          />
          <div className="flex-center flex-col ml-auto text-lg">
            <p>154</p>
            <p>좋아요</p>
          </div>

          <div className="flex-center flex-col ml-auto text-lg">
            <p>32</p>
            <p>북마크</p>
          </div>
        </div>
        <div className="flex items-center mt-8">
          <svg
            className="ml-2 mr-4"
            width="36"
            height="36"
            viewBox="0 0 27 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21.8047 22.1348C21.8047 16.9957 17.6391 12.8301 12.5 12.8301C7.36094 12.8301 3.19531 16.9957 3.19531 22.1348H21.8047Z"
              fill="#CBF147"
            />
            <path
              d="M12.715 12.8382C15.4689 12.8382 17.7014 10.6056 17.7014 7.85169C17.7014 5.09775 15.4689 2.86523 12.715 2.86523C9.96103 2.86523 7.72852 5.09775 7.72852 7.85169C7.72852 10.6056 9.96103 12.8382 12.715 12.8382Z"
              fill="#CBF147"
            />
            <g clipPath="url(#clip0_720_1327)">
              <path
                d="M18.229 13.8008C17.5904 13.8007 16.9661 13.9901 16.4351 14.3449C15.9041 14.6997 15.4902 15.2039 15.2458 15.7939C15.0014 16.384 14.9375 17.0332 15.0621 17.6595C15.1867 18.2859 15.4942 18.8612 15.9458 19.3128L20.717 24.084C20.7541 24.1212 20.7983 24.1508 20.8469 24.171C20.8955 24.1911 20.9476 24.2015 21.0002 24.2015C21.0528 24.2015 21.1049 24.1911 21.1535 24.171C21.2021 24.1508 21.2462 24.1212 21.2834 24.084L26.0546 19.312C26.6437 18.7032 26.97 17.8873 26.9631 17.0401C26.9561 16.193 26.6165 15.3825 26.0175 14.7835C25.4185 14.1844 24.608 13.8448 23.7608 13.8379C22.9137 13.831 22.0978 14.1572 21.489 14.7464L21.0002 15.2344L20.5122 14.7464C20.2123 14.4465 19.8562 14.2086 19.4643 14.0463C19.0724 13.8841 18.6531 13.8007 18.229 13.8008Z"
                fill="#F24E1E"
              />
            </g>
            <defs>
              <clipPath id="clip0_720_1327">
                <rect
                  width="12"
                  height="12"
                  fill="white"
                  transform="translate(15 13)"
                />
              </clipPath>
            </defs>
          </svg>
          <p>윈스턴 처칠 Sir Winston Churchill</p>
        </div>

        <div className="flex items-center mt-4">
          <svg
            className="mr-4"
            width="46"
            height="36"
            viewBox="0 0 35 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.6914 19.3828L6.50725 19.3828L6.50725 10.1894L10.1901 2.82364L14.7684 2.82364L11.1039 10.1894L15.6914 10.1894L15.6914 19.3828Z"
              fill="#CBF147"
            />
            <path
              d="M28.5391 19.3828L19.3549 19.3828L19.3549 10.1894L23.0378 2.82364L27.616 2.82364L23.9516 10.1894L28.5391 10.1894L28.5391 19.3828Z"
              fill="#CBF147"
            />
            <g clipPath="url(#clip0_720_1333)">
              <path
                d="M23.229 12.8008C22.5904 12.8007 21.9661 12.9901 21.4351 13.3449C20.9041 13.6997 20.4902 14.2039 20.2458 14.7939C20.0014 15.384 19.9375 16.0332 20.0621 16.6595C20.1867 17.2859 20.4942 17.8612 20.9458 18.3128L25.717 23.084C25.7541 23.1212 25.7983 23.1508 25.8469 23.171C25.8955 23.1911 25.9476 23.2015 26.0002 23.2015C26.0528 23.2015 26.1049 23.1911 26.1535 23.171C26.2021 23.1508 26.2462 23.1212 26.2834 23.084L31.0546 18.312C31.6437 17.7032 31.97 16.8873 31.9631 16.0401C31.9561 15.193 31.6165 14.3825 31.0175 13.7835C30.4185 13.1844 29.608 12.8448 28.7608 12.8379C27.9137 12.831 27.0978 13.1572 26.489 13.7464L26.0002 14.2344L25.5122 13.7464C25.2123 13.4465 24.8562 13.2086 24.4643 13.0463C24.0724 12.8841 23.6531 12.8007 23.229 12.8008Z"
                fill="#F24E1E"
              />
            </g>
            <defs>
              <clipPath id="clip0_720_1333">
                <rect
                  width="12"
                  height="12"
                  fill="white"
                  transform="translate(20 12)"
                />
              </clipPath>
            </defs>
          </svg>

          <p>희망은 백일몽이다. - 아리스토텔레스 Aristotle</p>
        </div>
      </div>

      <div className="flex-col h-full bg-white overflow-hidden">
        <div className="ml-4 h-[66px] w-[565px] overflow-clip">
          <button
            className={`rounded-full border px-4 py-1 ${
              true
                ? 'border-[point-green] bg-point-green bg-opacity-10'
                : 'text-[#767676]'
            }  `}
          >
            자존감 12
          </button>
          <button
            className={`ml-4 rounded-full border px-4 py-1 ${
              true
                ? 'text-[#767676]'
                : 'border-[point-green] bg-point-green bg-opacity-10'
            }`}
          >
            자신감 20
          </button>
          <button
            className={`ml-4 rounded-full border px-4 py-1 ${
              true
                ? 'text-[#767676]'
                : 'border-[point-green] bg-point-green bg-opacity-10'
            }`}
          >
            희망 8
          </button>
          <button
            className={`ml-4 rounded-full border px-4 py-1 ${
              true
                ? 'text-[#767676]'
                : 'border-[point-green] bg-point-green bg-opacity-10'
            }`}
          >
            사랑 28
          </button>
          <button
            className={`ml-4 rounded-full border px-4 py-1 ${
              true
                ? 'text-[#767676]'
                : 'border-[point-green] bg-point-green bg-opacity-10'
            }`}
          >
            아이디어 4
          </button>
        </div>

        <div className="grid grid-cols-3">
          <div className="bg-gray-200 aspect-square border border-black"></div>
          <div className="bg-gray-200 aspect-square border border-black"></div>
          <div className="bg-gray-200 aspect-square border border-black"></div>
          <div className="bg-gray-200 aspect-square border border-black"></div>
          <div className="bg-gray-200 aspect-square border border-black"></div>
          <div className="bg-gray-200 aspect-square border border-black"></div>
          <div className="bg-gray-200 aspect-square border border-black"></div>
          <div className="bg-gray-200 aspect-square border border-black"></div>
          <div className="bg-gray-200 aspect-square border border-black"></div>
          <div className="bg-gray-200 aspect-square border border-black"></div>
          <div className="bg-gray-200 aspect-square border border-black"></div>
          <div className="bg-gray-200 aspect-square border border-black"></div>
        </div>
      </div>
    </div>
  )
}
