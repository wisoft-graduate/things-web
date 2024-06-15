import type { MetaFunction } from '@remix-run/node'
import EmojiPicker from 'emoji-picker-react'
import { useState } from 'react'

export const meta: MetaFunction = () => {
  return [
    { title: 'Things: List' },
    { name: 'description', content: 'Welcome to Things!' },
  ]
}

export default function List() {
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
  const [selectedBookmarkId, setSelectedBookmarkId] = useState('')
  const [isAddBookmarkOpen, setIsAddBookmarkOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)

  const addBookmark = (bookmark: Bookmark) => {
    setBookmarks([...bookmarks, bookmark])
    setSelectedEmoji('')
    setNewListName('')
    toggleAddBookmark()
  }

  const [newListName, setNewListName] = useState('')
  const [isEmojiOpen, setIsEmojiOpen] = useState(false)

  const [selectedEmoji, setSelectedEmoji] = useState('')
  const handleEmojiClick = (emojiObject: { emoji: SetStateAction<string> }) => {
    setSelectedEmoji(emojiObject.emoji)
    closeEmojiPicker()
  }

  const toggleAddBookmark = () => {
    setIsAddBookmarkOpen(!isAddBookmarkOpen)
  }

  const handleEditClick = (id: string) => {
    setSelectedBookmarkId(id)
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

  return (
    <div className="flex-col h-full bg-white p-16 overflow-hidden">
      <div className="grid gap-6 grid-cols-2 w-full mt-6">
        <button
          className="flex-col flex-center py-5 bg-[#f3f3f3] text-[#767676] text-lg rounded-[28px] h-48"
          onClick={toggleAddBookmark}
        >
          <p className="text-[28px]">⊕</p>
          <p className="text-[22px] mt-2">새 리스트 생성</p>
        </button>
        <div className="relative flex-col flex-center py-5 text-[#767676] text-lg border rounded-[28px]">
          <p className="text-[42px]">👍</p>
          <p className="text-[22px] mt-3">좋아요</p>
          <button
            className="absolute top-4 right-4"
            // onBlur={() => toggleReplyEdit(reply.id)}
            // onClick={() => toggleReplyEdit(reply.id)}
          >
            <svg
              width="6"
              height="18"
              viewBox="0 0 3 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="1.5" cy="1.5" r="1.5" fill="#767676" />
              <circle cx="1.5" cy="7.5" r="1.5" fill="#767676" />
              <circle cx="1.5" cy="13.5" r="1.5" fill="#767676" />
            </svg>
          </button>
          {isEditOpen && (
            <div className="absolute rounded-md flex flex-col bg-[#f6f6f6] text-[#767676] right-10">
              <button className="py-1 px-6">수정</button>
              <hr />
              <button className="py-1">삭제</button>
              <hr />
              <button className="py-1">신고</button>
            </div>
          )}
        </div>
        {bookmarks.map((bookmark) => (
          <div
            key={bookmark.id}
            className="relative flex-col flex-center py-5 text-[#767676] text-lg border rounded-[28px] h-48"
          >
            <p className="text-[42px]">{bookmark.icon}</p>
            <p className="text-[22px] mt-3">{bookmark.name}</p>
            {bookmark.visibility && (
              <div className="absolute top-4 left-4">
                <svg
                  width="16"
                  height="20"
                  viewBox="0 0 16 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.4405 7.33055H12.3405V4.40055C12.3405 3.24951 11.8833 2.14561 11.0694 1.3317C10.2555 0.517796 9.15159 0.0605469 8.00055 0.0605469C6.84951 0.0605469 5.74561 0.517796 4.9317 1.3317C4.11779 2.14561 3.66055 3.24951 3.66055 4.40055V7.33055H2.56055C1.89751 7.33055 1.26162 7.59394 0.79278 8.06278C0.323939 8.53162 0.0605469 9.16751 0.0605469 9.83055V17.4405C0.0623941 18.103 0.326379 18.7378 0.79482 19.2063C1.26326 19.6747 1.89807 19.9387 2.56055 19.9405H13.4405C14.103 19.9387 14.7378 19.6747 15.2063 19.2063C15.6747 18.7378 15.9387 18.103 15.9405 17.4405V9.83055C15.9405 9.16751 15.6772 8.53162 15.2083 8.06278C14.7395 7.59394 14.1036 7.33055 13.4405 7.33055ZM4.66055 4.40055C4.66055 3.51472 5.01244 2.66518 5.63881 2.03881C6.26518 1.41244 7.11472 1.06055 8.00055 1.06055C8.88637 1.06055 9.73591 1.41244 10.3623 2.03881C10.9887 2.66518 11.3405 3.51472 11.3405 4.40055V7.33055H4.66055V4.40055ZM14.9405 17.4405C14.9377 17.8375 14.7787 18.2173 14.498 18.498C14.2173 18.7787 13.8375 18.9377 13.4405 18.9405H2.56055C2.16361 18.9377 1.78375 18.7787 1.50307 18.498C1.22239 18.2173 1.06343 17.8375 1.06055 17.4405V9.83055C1.06055 9.43272 1.21858 9.05119 1.49989 8.76989C1.78119 8.48858 2.16272 8.33055 2.56055 8.33055H13.4405C13.8384 8.33055 14.2199 8.48858 14.5012 8.76989C14.7825 9.05119 14.9405 9.43272 14.9405 9.83055V17.4405Z"
                    fill="#767676"
                  />
                  <path
                    d="M9.00001 12.9492C9.00058 13.1241 8.95457 13.2959 8.86669 13.4471C8.77881 13.5982 8.65224 13.7232 8.50001 13.8092V15.3092C8.50001 15.4418 8.44733 15.569 8.35356 15.6628C8.25979 15.7565 8.13261 15.8092 8.00001 15.8092C7.8674 15.8092 7.74022 15.7565 7.64645 15.6628C7.55268 15.569 7.50001 15.4418 7.50001 15.3092V13.8092C7.34777 13.7232 7.22121 13.5982 7.13333 13.4471C7.04544 13.2959 6.99943 13.1241 7.00001 12.9492C7.00001 12.684 7.10536 12.4296 7.2929 12.2421C7.48044 12.0546 7.73479 11.9492 8.00001 11.9492C8.26522 11.9492 8.51958 12.0546 8.70711 12.2421C8.89465 12.4296 9.00001 12.684 9.00001 12.9492Z"
                    fill="#767676"
                  />
                </svg>
              </div>
            )}

            <button
              className="absolute top-4 right-4"
              onBlur={() => handleEditClick('')}
              onClick={() => handleEditClick(bookmark.id)}
            >
              <svg
                width="6"
                height="18"
                viewBox="0 0 3 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="1.5" cy="1.5" r="1.5" fill="#767676" />
                <circle cx="1.5" cy="7.5" r="1.5" fill="#767676" />
                <circle cx="1.5" cy="13.5" r="1.5" fill="#767676" />
              </svg>
            </button>
            {selectedBookmarkId == bookmark.id && (
              <div className="absolute rounded-md flex flex-col bg-[#f6f6f6] text-[#767676] w-28 left-48">
                <button className="py-1 px-6">이름변경</button>
                <hr />
                <button className="py-1">잠금</button>
                <hr />
                <button className="py-1">삭제</button>
              </div>
            )}
          </div>
        ))}
      </div>

      {isAddBookmarkOpen && (
        <div className="flex items-center flex-col w-full layer popup bg-white h-[40%] animate-slide-up !top-auto overflow-hidden full rounded-t-[30px] px-16 border">
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
    </div>
  )
}
