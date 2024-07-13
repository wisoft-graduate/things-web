import type { MetaFunction } from '@remix-run/node'
import EmojiPicker from 'emoji-picker-react'
import { SetStateAction, useEffect, useState } from 'react'

import axios from '../api/axios'
import { useSwipeable } from 'react-swipeable'

export const meta: MetaFunction = () => {
  return [
    { title: 'Things' },
    { name: 'description', content: 'Welcome to Things!' },
  ]
}

interface Comment {
  id: number
  nickname: string
  text: string
  userAvatar: string
  lastUpdatedTime: Date
  replies: Comment[]
  isOpen: boolean
}

interface Bookmark {
  id: number
  name: string
  quotationIds: []
  visibility: boolean
  icon: string
}

interface Quote {
  id: string
  authorId: string
  content: string
  likeCount: number
  shareCount: number
  commentCount: number
  backgroundImagePath: string
}

export default function Quotes() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [quotes, setQuotes] = useState<Quote[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchQuote(currentIndex)
  }, [currentIndex])

  const fetchQuote = async (index: number) => {
    setLoading(true)
    try {
      const response = await axios.get(`/quotations?page=${index + 2}&count=1`)
      console.log(response)

      const newQuote: Quote = response.data.data.quotationList[0]
      setQuotes((prevQuotes) => {
        const quoteExists = prevQuotes.some((quote) => quote.id === newQuote.id)
        return quoteExists ? prevQuotes : [...prevQuotes, newQuote]
      })
    } catch (error) {
      console.error('Error fetching quote:', error)
    } finally {
      setLoading(false)
    }
  }

  const handlers = useSwipeable({
    onSwipedLeft: () => setCurrentIndex((prevIndex) => prevIndex + 1),
    onSwipedRight: () =>
      setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0)),
    trackMouse: true,
  })

  const [isCommentOpen, setIsCommentOpen] = useState(false)
  const [isBookmarkOpen, setIsBookmarkOpen] = useState(false)
  const [isAddBookmarkOpen, setIsAddBookmarkOpen] = useState(false)

  const [newListName, setNewListName] = useState('')
  const [isEmojiOpen, setIsEmojiOpen] = useState(false)

  const [selectedEmoji, setSelectedEmoji] = useState('')
  const handleEmojiClick = (emojiObject: { emoji: SetStateAction<string> }) => {
    setSelectedEmoji(emojiObject.emoji)
    closeEmojiPicker()
  }

  const toggleEmojiPicker = () => {
    setIsEmojiOpen(!isEmojiOpen)
  }

  const closeEmojiPicker = () => {
    setIsEmojiOpen(false)
  }

  const [isPublic, setIsPublic] = useState(true)
  const handlePublicClick = () => {
    setIsPublic(true)
  }

  const handlePrivateClick = () => {
    setIsPublic(false)
  }

  const handleListName = (e: { target: { value: SetStateAction<string> } }) => {
    setNewListName(e.target.value)
  }

  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      nickname: 'test1',
      text: 'comment1',
      userAvatar: 'https://via.placeholder.com/50',
      lastUpdatedTime: new Date(new Date().getTime() - 2 * 24 * 60 * 60 * 1000),
      replies: [
        {
          id: 2,
          nickname: 'test2',
          text: 'reply comment1',
          userAvatar: 'https://via.placeholder.com/50',
          lastUpdatedTime: new Date(),
          replies: [],
          isOpen: false,
        },
      ],
      isOpen: false,
    },
    {
      id: 3,
      nickname: 'test2',
      text: 'comment1',
      userAvatar: 'https://via.placeholder.com/50',
      lastUpdatedTime: new Date(
        new Date().getTime() - 60 * 24 * 60 * 60 * 1000
      ),
      replies: [
        {
          id: 4,
          nickname: 'test3',
          text: 'reply comment1',
          userAvatar: 'https://via.placeholder.com/50',
          lastUpdatedTime: new Date(
            new Date().getTime() - 1 * 24 * 60 * 60 * 100
          ),
          replies: [],
          isOpen: false,
        },
      ],
      isOpen: false,
    },
  ])

  const [bookmarks, setBookmarks] = useState<Bookmark[]>([
    {
      id: 1,
      name: '자존감',
      icon: '🕶️',
      visibility: true,
      quotationIds: [],
    },
    {
      id: 2,
      name: '공부',
      icon: '🎓',
      visibility: true,
      quotationIds: [],
    },
    {
      id: 3,
      name: '사랑',
      icon: '❤️',
      visibility: false,
      quotationIds: [],
    },
  ])

  const addBookmark = (bookmark: Bookmark) => {
    setBookmarks([...bookmarks, bookmark])
    setSelectedEmoji('')
    setNewListName('')
    toggleAddBookmark()
  }

  const toggleComment = () => {
    setIsCommentOpen(!isCommentOpen)
  }

  const toggleBookmark = () => {
    setIsBookmarkOpen(!isBookmarkOpen)
  }

  const toggleAddBookmark = () => {
    setIsBookmarkOpen(false)
    setIsAddBookmarkOpen(!isAddBookmarkOpen)
  }

  const toggleCommentEdit = (id: number) => {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === id ? { ...comment, isOpen: !comment.isOpen } : comment
      )
    )
  }

  const toggleReplyEdit = (id: number) => {
    setComments((prevComments) =>
      prevComments.map((comment) => ({
        ...comment,
        replies: comment.replies.map((reply) =>
          reply.id === id ? { ...reply, isOpen: !reply.isOpen } : reply
        ),
      }))
    )
  }

  function formatTimeAgo(date: Date): string {
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000)
    let interval = Math.floor(seconds / 31536000)

    if (interval > 1) {
      return `${interval}년 전`
    }
    interval = Math.floor(seconds / 2592000)
    if (interval > 1) {
      return `${interval}달 전`
    }
    interval = Math.floor(seconds / 86400)
    if (interval > 1) {
      return `${interval}일 전`
    }
    interval = Math.floor(seconds / 3600)
    if (interval > 1) {
      return `${interval}시간 전`
    }
    interval = Math.floor(seconds / 60)
    if (interval > 1) {
      return `${interval}분 전`
    }
    return '방금'
  }

  return (
    <div
      {...handlers}
      className="slideshow-container bg-green-600 overflow-hidden"
    >
      <div className="absolute inset-0 bg-black opacity-30"></div>

      {isCommentOpen && (
        <div className="flex-center w-full layer popup bg-white h-[60%] animate-slide-up !top-auto overflow-hidden full rounded-t-[30px] p-4">
          <button className="absolute top-10 right-10" onClick={toggleComment}>
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
          <h1 className="absolute top-10">댓글</h1>

          <div className="absolute top-16 px-8 w-full">
            {comments.map((comment) => (
              <div key={comment.id} className="mt-8 flex w-full">
                <img
                  src={comment.userAvatar}
                  alt="avatar"
                  className="rounded-full w-10 h-10 mr-3"
                />
                <div>
                  <div className="flex">
                    <p>{comment.nickname}</p>
                    <p className="ml-2 text-[#767676]">
                      {formatTimeAgo(comment.lastUpdatedTime)}
                    </p>
                    <button
                      className=" absolute right-10"
                      onBlur={() => toggleCommentEdit(comment.id)}
                      onClick={() => toggleCommentEdit(comment.id)}
                    >
                      <svg
                        width="6"
                        height="18"
                        viewBox="0 0 3 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle cx="1.5" cy="1.5" r="1.5" fill="#DDDDDD" />
                        <circle cx="1.5" cy="7.5" r="1.5" fill="#DDDDDD" />
                        <circle cx="1.5" cy="13.5" r="1.5" fill="#DDDDDD" />
                      </svg>
                    </button>
                    {comment.isOpen && (
                      <div className="absolute rounded-md flex flex-col bg-[#f6f6f6] text-[#767676] right-10">
                        <button className="py-1 px-6">수정</button>
                        <hr />
                        <button className="py-1">삭제</button>
                        <hr />
                        <button className="py-1">신고</button>
                      </div>
                    )}
                  </div>
                  <p>{comment.text}</p>
                  <button className="text-[#767676]">답글 달기</button>
                  <ul>
                    {comment.replies.map((reply) => (
                      <li key={reply.id} className="flex mt-8">
                        <img
                          src={reply.userAvatar}
                          alt="avatar"
                          className="rounded-full w-10 h-10 mr-3"
                        />
                        <div>
                          <div className="flex">
                            <p>{reply.nickname}</p>
                            <p className="ml-2 text-[#767676]">
                              {formatTimeAgo(reply.lastUpdatedTime)}
                            </p>
                            <button
                              className="absolute right-10"
                              onBlur={() => toggleReplyEdit(reply.id)}
                              onClick={() => toggleReplyEdit(reply.id)}
                            >
                              <svg
                                width="6"
                                height="18"
                                viewBox="0 0 3 15"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <circle
                                  cx="1.5"
                                  cy="1.5"
                                  r="1.5"
                                  fill="#DDDDDD"
                                />
                                <circle
                                  cx="1.5"
                                  cy="7.5"
                                  r="1.5"
                                  fill="#DDDDDD"
                                />
                                <circle
                                  cx="1.5"
                                  cy="13.5"
                                  r="1.5"
                                  fill="#DDDDDD"
                                />
                              </svg>
                            </button>
                            {reply.isOpen && (
                              <div className="absolute rounded-md flex flex-col bg-[#f6f6f6] text-[#767676] right-10">
                                <button className="py-1 px-6">수정</button>
                                <hr />
                                <button className="py-1">삭제</button>
                                <hr />
                                <button className="py-1">신고</button>
                              </div>
                            )}
                          </div>
                          <p>{reply.text}</p>
                          <button className="text-[#767676]">답글 달기</button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
          <form
            // onSubmit={handleSubmit}
            className="absolute bottom-10 flex items-center w-[90%]"
          >
            <img
              src="https://via.placeholder.com/50"
              alt="Your Avatar"
              className="rounded-full w-12 h-12 mr-3"
            />
            <div className={`flex rounded-full bg-[#F3F3F3] px-2 w-full h-12`}>
              <input
                type="text"
                className="placeholder-[#767676] bg-[#F3F3F3] outline-none flex-grow ml-4"
                placeholder="댓글 입력..."
              />
              <button
                type="submit"
                className="px-6 my-1 bg-point-green text-white rounded-full"
              >
                <svg
                  width="21"
                  height="23"
                  viewBox="0 0 17 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.8719 8.90648C15.771 9.00774 15.6511 9.08808 15.5191 9.1429C15.3871 9.19772 15.2455 9.22594 15.1026 9.22594C14.9596 9.22594 14.8181 9.19772 14.686 9.1429C14.554 9.08808 14.4341 9.00774 14.3332 8.90648L9.67262 4.2459V17.5515C9.67262 17.8396 9.55818 18.1158 9.35449 18.3195C9.15079 18.5232 8.87452 18.6377 8.58645 18.6377C8.29838 18.6377 8.02211 18.5232 7.81841 18.3195C7.61471 18.1158 7.50028 17.8396 7.50028 17.5515V4.2459L2.83789 8.90648C2.63384 9.11053 2.35709 9.22516 2.06852 9.22516C1.77995 9.22516 1.5032 9.11053 1.29915 8.90648C1.0951 8.70243 0.980469 8.42568 0.980469 8.13711C0.980469 7.84854 1.0951 7.57179 1.29915 7.36774L7.81617 0.850716C7.91708 0.749456 8.03699 0.669112 8.16901 0.614291C8.30104 0.55947 8.44259 0.53125 8.58554 0.53125C8.7285 0.53125 8.87005 0.55947 9.00207 0.614291C9.1341 0.669112 9.254 0.749456 9.35491 0.850716L15.8719 7.36774C15.9732 7.46865 16.0535 7.58855 16.1084 7.72058C16.1632 7.8526 16.1914 7.99415 16.1914 8.13711C16.1914 8.28006 16.1632 8.42161 16.1084 8.55364C16.0535 8.68566 15.9732 8.80557 15.8719 8.90648Z"
                    fill="#1F1F25"
                  />
                </svg>
              </button>
            </div>
          </form>
        </div>
      )}

      {isBookmarkOpen && (
        <div className="flex items-center flex-col w-full layer popup bg-white h-[60%] animate-slide-up !top-auto overflow-hidden full rounded-t-[30px] px-16">
          <button className="absolute top-10 right-10" onClick={toggleBookmark}>
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
          <h1 className="absolute top-10">리스트 추가</h1>
          <button
            type="submit"
            // disabled={true}
            onClick={toggleAddBookmark}
            className={`mt-20 bg-[#f3f3f3] text-[#767676] rounded-full w-full py-4
            ${
              false
                ? 'bg-point-green drop-shadow-lg transition-all duration-300 ease-in-out'
                : ''
            }`}
          >
            ⊕ 새 리스트 생성
          </button>
          <div className="grid gap-6 grid-cols-2 w-full mt-6">
            <div className="flex-center py-5 text-[#767676] text-lg border rounded-[20px]">
              <p className="text-[28px] mr-2">👍</p>
              <p>좋아요</p>
            </div>
            {bookmarks.map((bookmark) => (
              <div
                key={bookmark.id}
                className="flex-center py-5 text-[#767676] text-lg border rounded-[20px]"
              >
                <p className="text-[28px] mr-2">{bookmark.icon}</p>
                <p>{bookmark.name}</p>
              </div>
            ))}
          </div>
          <button
            type="submit"
            // disabled={true}
            className={`absolute bottom-10 bg-[#f3f3f3] text-[#767676] rounded-full w-[77.4%] mt-6 py-5
            ${
              false
                ? 'bg-point-green drop-shadow-lg transition-all duration-300 ease-in-out'
                : ''
            }`}
          >
            저장
          </button>
        </div>
      )}

      {isAddBookmarkOpen && (
        <div className="flex items-center flex-col w-full layer popup bg-white h-[40%] animate-slide-up !top-auto overflow-hidden full rounded-t-[30px] px-16">
          <button
            className="absolute top-10 right-10"
            onClick={toggleAddBookmark}
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
          <h1 className="absolute top-10">새 리스트 생성</h1>
          <div className="flex mt-20 w-full">
            <button
              onClick={toggleEmojiPicker}
              className="bg-[#f3f3f3] text-[#767676] rounded-xl px-2 z-100"
            >
              <p className="text-[32px]">
                {selectedEmoji ? selectedEmoji : '⊕'}
              </p>
            </button>
            {/* <div onBlur={closeEmojiPicker}> */}
            <EmojiPicker
              open={isEmojiOpen}
              onEmojiClick={handleEmojiClick}
              className="!absolute left-10 top-10 z-10"
              height={350}
            />
            {/* </div> */}

            <div
              className={`flex-center rounded-full bg-[#F3F3F3] px-2 w-full h-12 ml-4`}
            >
              <input
                type="text"
                value={newListName}
                onChange={handleListName}
                maxLength={10}
                className="flex-grow placeholder-[#767676] bg-[#F3F3F3] outline-none ml-4"
                placeholder="새 리스트 명을 입력해 주세요."
              />
              <p className="text-[#767676] mr-2">{newListName.length}/10</p>
            </div>
          </div>
          <hr className="mt-4 w-full" />

          <div className="flex-center mt-4">
            <p>공개 여부</p>
            <button
              onClick={handlePublicClick}
              className={`ml-20 rounded-full border px-4 py-1 ${
                isPublic
                  ? 'border-[point-green] bg-point-green bg-opacity-10'
                  : 'text-[#767676]'
              }  `}
            >
              공개
            </button>
            <button
              onClick={handlePrivateClick}
              className={`ml-4 rounded-full border px-4 py-1 ${
                isPublic
                  ? 'text-[#767676]'
                  : 'border-[point-green] bg-point-green bg-opacity-10'
              }`}
            >
              비공개
            </button>
          </div>
          <button
            type="submit"
            disabled={selectedEmoji && newListName ? false : true}
            onClick={() =>
              addBookmark({
                id: 1,
                name: newListName,
                icon: selectedEmoji,
                visibility: isPublic,
                quotationIds: [],
              })
            }
            className={`absolute bottom-10 bg-[#f3f3f3] rounded-full w-[77.4%] mt-6 py-5
            ${
              selectedEmoji && newListName
                ? 'bg-point-green drop-shadow-lg transition-all duration-300 ease-in-out'
                : 'text-[#767676]'
            }`}
          >
            저장
          </button>
        </div>
      )}

      {loading && <div>Loading...</div>}
      {quotes[currentIndex] && (
        <div className="flex-center h-screen bg-cover bg-[url('/edison.jpg')] ">
          <div id="quotation" className="absolute mt-[-100px] px-20">
            <svg
              width="50"
              height="38"
              viewBox="0 0 50 38"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20.7285 37.375L-0.000654221 37.375L-0.000652407 16.625L8.31185 -1.0855e-06L18.6452 -1.82131e-07L10.3743 16.625L20.7285 16.625L20.7285 37.375Z"
                fill="#CBF147"
              />
              <path
                d="M49.7285 37.375L28.9993 37.375L28.9993 16.625L37.3119 -7.72376e-07L47.6452 1.30992e-07L39.3743 16.625L49.7285 16.625L49.7285 37.375Z"
                fill="#CBF147"
              />
            </svg>

            <p className=" text-white mt-2 p-2 text-xl">
              {/* 밤이 어두울수록 더 많은 것을 본다. <br />
              The darker it is at night See more. */}
              {quotes[currentIndex].content}
              {/* <p className="text-white text-right text-base">- 에디슨 Edison</p> */}
              <p className="text-white text-right text-base">
                - {quotes[currentIndex].authorId}
              </p>
            </p>
          </div>
          <div
            id="buttons"
            className="absolute flex-col text-white right-8 bottom-40"
          >
            <div id="likes" className="flex-center flex-col mb-4">
              <button>
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 22 20"
                  fill="white"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.6831 19.7182L20.2684 10.7128C21.3824 9.5315 22.0044 7.94236 22 6.28863C21.9956 4.6349 21.3652 3.04934 20.2451 1.87445C19.6956 1.29207 19.0401 0.829043 18.3167 0.512291C17.5934 0.19554 16.8166 0.0313927 16.0317 0.0293987C15.2467 0.0274047 14.4692 0.187604 13.7444 0.500676C13.0195 0.813749 12.3619 1.27345 11.8096 1.85302L10.9901 2.71443L10.1583 1.84302C9.60953 1.26142 8.95494 0.798971 8.2326 0.482575C7.51026 0.166179 6.73459 0.00214778 5.95068 2.09513e-05C5.16677 -0.00210588 4.39028 0.157714 3.66636 0.470186C2.94244 0.782658 2.28554 1.24155 1.73386 1.82017C-0.58709 4.25581 -0.57609 8.21427 1.75586 10.6613L10.3865 19.7182C10.744 20.0939 11.3256 20.0939 11.6831 19.7182ZM12.7872 2.85728C13.2117 2.41212 13.7172 2.05917 14.2743 1.819C14.8313 1.57883 15.4288 1.45623 16.032 1.45836C16.6351 1.46049 17.2318 1.58729 17.7873 1.83139C18.3427 2.07548 18.8459 2.43199 19.2675 2.88013C20.1326 3.78774 20.6198 5.01227 20.6239 6.28964C20.628 7.56702 20.1488 8.79491 19.2895 9.70851V9.71137L11.0341 18.3683L2.73209 9.65565C0.926751 7.76142 0.925376 4.69865 2.71146 2.82442C3.13539 2.38008 3.64016 2.0278 4.19639 1.78809C4.75262 1.54838 5.34919 1.42603 5.95137 1.42815C6.55355 1.43028 7.14931 1.55685 7.70395 1.80048C8.2586 2.04412 8.76105 2.39996 9.18207 2.84728L10.502 4.23295C10.566 4.30012 10.6421 4.35344 10.726 4.38983C10.8099 4.42622 10.8999 4.44495 10.9908 4.44495C11.0818 4.44495 11.1718 4.42622 11.2557 4.38983C11.3396 4.35344 11.4157 4.30012 11.4796 4.23295L12.7872 2.85728Z"
                    fill="white"
                  />
                </svg>
              </button>
              <p>2.2만</p>
            </div>
            <div id="comments" className="flex-center flex-col mb-4">
              <button onClick={toggleComment}>
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 23 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.972 16.0553C14.972 16.2395 14.8988 16.4162 14.7686 16.5464C14.6384 16.6766 14.4617 16.7498 14.2776 16.7498H4.55534C4.40256 16.7498 4.25673 16.8887 4.13173 16.9789L1.77756 18.8331V7.72201C1.77756 7.53783 1.85073 7.36119 1.98096 7.23096C2.11119 7.10073 2.28783 7.02756 2.47201 7.02756H5.15256V5.63867H2.47201C1.91947 5.63867 1.38957 5.85817 0.998866 6.24887C0.608165 6.63957 0.388672 7.16947 0.388672 7.72201V20.222C0.389705 20.351 0.426635 20.4771 0.495322 20.5863C0.564009 20.6954 0.661739 20.7833 0.777561 20.8401C0.889143 20.8908 1.01217 20.9111 1.13414 20.8989C1.25611 20.8867 1.37268 20.8425 1.47201 20.7706L5.04839 18.1387H14.3817C14.6449 18.1465 14.9069 18.1001 15.1515 18.0025C15.396 17.9049 15.618 17.7582 15.8035 17.5713C15.9891 17.3845 16.1343 17.1615 16.2301 16.9163C16.326 16.6711 16.3705 16.4088 16.3609 16.1456V15.3609H14.972V16.0553Z"
                    fill="white"
                  />
                  <path
                    d="M20.5276 0.777344H8.72201C8.16947 0.777344 7.63957 0.996837 7.24887 1.38754C6.85817 1.77824 6.63867 2.30814 6.63867 2.86068V11.194C6.63867 11.7465 6.85817 12.2764 7.24887 12.6671C7.63957 13.0578 8.16947 13.2773 8.72201 13.2773H18.1317L21.4512 15.8537C21.5499 15.9267 21.6661 15.9722 21.7881 15.9856C21.9101 15.999 22.0334 15.9799 22.1456 15.9301C22.2638 15.8738 22.3637 15.7853 22.4337 15.6747C22.5037 15.5641 22.5411 15.436 22.5415 15.3051V2.86068C22.5418 2.31997 22.3318 1.80032 21.956 1.41156C21.5802 1.02279 21.068 0.795367 20.5276 0.777344ZM21.222 13.9301L18.7914 12.0343C18.6702 11.9402 18.5213 11.8889 18.3678 11.8885H8.72201C8.53783 11.8885 8.36119 11.8153 8.23096 11.6851C8.10073 11.5548 8.02756 11.3782 8.02756 11.194V2.86068C8.02756 2.6765 8.10073 2.49986 8.23096 2.36963C8.36119 2.2394 8.53783 2.16623 8.72201 2.16623H20.5276C20.7132 2.18308 20.8863 2.26722 21.0142 2.4028C21.1421 2.53838 21.216 2.71605 21.222 2.90234V13.9301Z"
                    fill="white"
                  />
                </svg>
              </button>
              <p>1만</p>
            </div>

            <div id="bookmarks" className="flex-center flex-col mb-4">
              <button onClick={toggleBookmark}>
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 17 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.20898 19.875V3.20833C1.20898 2.6558 1.42848 2.12589 1.81918 1.73519C2.20988 1.34449 2.73978 1.125 3.29232 1.125H13.709C14.2615 1.125 14.7914 1.34449 15.1821 1.73519C15.5728 2.12589 15.7923 2.6558 15.7923 3.20833V19.875L9.62773 15.9115C9.29159 15.6952 8.90034 15.5803 8.50065 15.5803C8.10096 15.5803 7.70971 15.6952 7.37357 15.9115L1.20898 19.875Z"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <p>1천</p>
            </div>

            <div id="shares" className="flex-center flex-col">
              <button>
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 16 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.5 8.74934V19.2493C1.5 19.3873 1.612 19.4993 1.75 19.4993H14.25C14.3163 19.4993 14.3799 19.473 14.4268 19.4261C14.4737 19.3792 14.5 19.3156 14.5 19.2493V8.74934C14.5 8.68304 14.4737 8.61945 14.4268 8.57256C14.3799 8.52568 14.3163 8.49934 14.25 8.49934H11.75C11.5511 8.49934 11.3603 8.42032 11.2197 8.27967C11.079 8.13902 11 7.94825 11 7.74934C11 7.55043 11.079 7.35966 11.2197 7.21901C11.3603 7.07836 11.5511 6.99934 11.75 6.99934H14.25C15.216 6.99934 16 7.78334 16 8.74934V19.2493C16 19.7135 15.8156 20.1586 15.4874 20.4868C15.1592 20.815 14.7141 20.9993 14.25 20.9993H1.75C1.28587 20.9993 0.840752 20.815 0.512563 20.4868C0.184375 20.1586 0 19.7135 0 19.2493V8.74934C0 7.78334 0.784 6.99934 1.75 6.99934H4.25C4.44891 6.99934 4.63968 7.07836 4.78033 7.21901C4.92098 7.35966 5 7.55043 5 7.74934C5 7.94825 4.92098 8.13902 4.78033 8.27967C4.63968 8.42032 4.44891 8.49934 4.25 8.49934H1.75C1.6837 8.49934 1.62011 8.52568 1.57322 8.57256C1.52634 8.61945 1.5 8.68304 1.5 8.74934ZM8.53 0.21934L11.78 3.46934C11.8787 3.56101 11.9509 3.67761 11.9889 3.80686C12.0269 3.93611 12.0294 4.07322 11.996 4.20375C11.9626 4.33427 11.8947 4.45338 11.7993 4.54852C11.7039 4.64366 11.5846 4.71131 11.454 4.74434C11.3236 4.77776 11.1867 4.77543 11.0575 4.73759C10.9283 4.69976 10.8117 4.62782 10.72 4.52934L8.75 2.55934V13.2493C8.75 13.4483 8.67098 13.639 8.53033 13.7797C8.38968 13.9203 8.19891 13.9993 8 13.9993C7.80109 13.9993 7.61032 13.9203 7.46967 13.7797C7.32902 13.639 7.25 13.4483 7.25 13.2493V2.55934L5.28 4.52934C5.13774 4.66175 4.94969 4.73385 4.75537 4.7305C4.56105 4.72714 4.3756 4.64858 4.238 4.51134C4.10076 4.37374 4.0222 4.18829 4.01884 3.99397C4.01549 3.79965 4.08759 3.6116 4.22 3.46934L7.47 0.21934C7.61063 0.0788896 7.80125 0 8 0C8.19875 0 8.38937 0.0788896 8.53 0.21934Z"
                    fill="white"
                  />
                </svg>
              </button>
              <p>1.2천</p>
            </div>
          </div>
          <div id="favorites" className="absolute left-8 bottom-36">
            <button className="text-white bg-[#d9d9d9] bg-opacity-10 hover:bg-opacity-40 transition duration-300 ease-in-out border-point-green border-[1px] px-4 py-1.5 rounded-full">
              대표 명언 설정
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
