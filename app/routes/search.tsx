import type { MetaFunction } from '@remix-run/node'
import { SetStateAction, useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'

import axios from 'axios'

export const meta: MetaFunction = () => {
  return [
    { title: 'Things: Search' },
    { name: 'description', content: 'Welcome to Things!' },
  ]
}

export default function Search() {
  const [activeTab, setActiveTab] = useState('조회순')

  const [photos, setPhotos] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)

  const handleTabClick = async (tab: SetStateAction<string>) => {
    setActiveTab(tab)
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=10`
      )
      setPhotos((prevPhotos) => [...prevPhotos, ...response.data])
      setLoading(false)
      if (response.data.length === 0) {
        // 더 이상 불러올 데이터가 없는 경우
        setHasMore(false)
      }
    }

    fetchData()
  }, [page])

  const fetchMoreData = () => {
    setPage((prevPage) => prevPage + 1)
  }

  return (
    <div className="flex-col h-full bg-white p-8 overflow-hidden">
      <div className="flex-center rounded-full bg-[#F3F3F3] w-full h-12 px-4">
        <svg
          className="mb-0.5"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="#8e8e93"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M19.6332 17.9638L14.1574 12.4857C15.139 11.1469 15.6648 9.52838 15.6575 7.86833C15.6387 3.53505 12.134 0.0251076 7.80094 7.96008e-05C5.72731 -0.00930271 3.73606 0.811058 2.27078 2.27841C0.805502 3.74576 -0.0120929 5.73821 0.000135216 7.8119C0.0188636 12.1456 3.52389 15.6558 7.85737 15.6809C9.52411 15.6881 11.1485 15.1561 12.4881 14.1644L12.4938 14.1601L17.9646 19.6339C18.2604 19.9442 18.7012 20.0698 19.1161 19.9621C19.531 19.8543 19.8549 19.5301 19.9623 19.1151C20.0698 18.7 19.9438 18.2594 19.6332 17.9638ZM1.56651 7.81801C1.58172 11.2848 4.3857 14.0927 7.85229 14.1126C9.51097 14.1195 11.1036 13.463 12.2756 12.2892C13.4476 11.1154 14.1017 9.52175 14.0924 7.86301C14.0771 4.39626 11.2732 1.58836 7.80657 1.56841C6.14789 1.56152 4.55529 2.21805 3.38328 3.39184C2.21128 4.56563 1.55715 6.15927 1.56651 7.81801Z"
          />
        </svg>
        <input
          type="text"
          maxLength={10}
          className="flex-grow placeholder-[#767676] bg-[#F3F3F3] outline-none ml-4"
          placeholder="저자, 명언으로 검색..."
        />
      </div>

      <div className="grid grid-cols-3 gap-16 mt-4 px-8">
        <button
          onClick={() => handleTabClick('조회순')}
          className={`flex-grow text-lg   ${
            activeTab === '조회순' ? 'border-b-2 border-black' : ''
          }`}
        >
          조회 순
        </button>
        <button
          onClick={() => handleTabClick('좋아요순')}
          className={`flex-grow text-lg px-4 py-2 focus:outline-none ${
            activeTab === '좋아요순' ? 'border-b-2 border-black' : ''
          }`}
        >
          좋아요 순
        </button>
        <button
          onClick={() => handleTabClick('공유순')}
          className={`flex-grow text-lg px-4 py-2 focus:outline-none ${
            activeTab === '공유순' ? 'border-b-2 border-black' : ''
          }`}
        >
          공유 순
        </button>
      </div>
      <div className="mt-4 overflow-y-auto">
        {activeTab === '조회순' && (
          //   <div className="grid grid-cols-2 gap-4">
          <InfiniteScroll
            dataLength={photos.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={<div className="text-center">로딩 중...</div>}
            endMessage={
              <div className="text-center">모든 항목을 불러왔습니다.</div>
            }
          >
            <div className="grid grid-cols-2 gap-4">
              {photos.map((photo) => (
                <div
                  key={photo.id}
                  className="w-[242px] h-[282px] rounded-[20px]"
                >
                  <div className="ml-2 mt-2 flex-center absolute rounded-full bg-[#111111]  bg-opacity-50 w-8 h-8 text-white">
                    <p className="text-lg text-bold">1</p>
                  </div>
                  <img
                    src={photo.thumbnailUrl}
                    alt={photo.title}
                    className="h-full rounded-[20px]"
                  />
                </div>
              ))}
            </div>
          </InfiniteScroll>
          //   </div>
        )}
        {activeTab === '좋아요순' && (
          <div className="flex bg-green-500 h-[12600px] overflow-y-auto">
            좋아요순 화면
          </div>
        )}
        {activeTab === '공유순' && (
          <div className="flex bg-blue-500">공유순 화면</div>
        )}
      </div>
    </div>
  )
}
