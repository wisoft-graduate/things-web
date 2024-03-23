export default function BottomTab() {
  return (
    <nav className="absolute bottom-0 left-0 w-full bg-tab-black text-white text-sm h-[9%]">
      <div className="flex h-full items-center parent:hover .child">
        <div className="group flex-1 flex-col flex-center cursor-pointer">
          <svg
            className="mb-0.5"
            width="24"
            height="24"
            viewBox="0 0 14 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              className="group-hover:fill-point-green"
              d="M0 12V4L1.95 0H6.15L4.2 4H6V12H0ZM1 4.23V11H5V5H2.6L4.55 1H2.58L1 4.23ZM7 12V4L8.95 0H13.15L11.2 4H13V12H7ZM8 4.23V11H12V5H9.6L11.55 1H9.58L8 4.23Z"
              fill="white"
            />
          </svg>

          <p className="group-hover:text-point-green">Quotes</p>
        </div>
        <div className="group flex-1 flex-col flex-center cursor-pointer">
          <svg
            className="mb-0.5 group-hover:fill-point-green"
            width="24"
            height="24"
            viewBox="0 0 20 20"
            fill="white"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M19.6332 17.9638L14.1574 12.4857C15.139 11.1469 15.6648 9.52838 15.6575 7.86833C15.6387 3.53505 12.134 0.0251076 7.80094 7.96008e-05C5.72731 -0.00930271 3.73606 0.811058 2.27078 2.27841C0.805502 3.74576 -0.0120929 5.73821 0.000135216 7.8119C0.0188636 12.1456 3.52389 15.6558 7.85737 15.6809C9.52411 15.6881 11.1485 15.1561 12.4881 14.1644L12.4938 14.1601L17.9646 19.6339C18.2604 19.9442 18.7012 20.0698 19.1161 19.9621C19.531 19.8543 19.8549 19.5301 19.9623 19.1151C20.0698 18.7 19.9438 18.2594 19.6332 17.9638ZM1.56651 7.81801C1.58172 11.2848 4.3857 14.0927 7.85229 14.1126C9.51097 14.1195 11.1036 13.463 12.2756 12.2892C13.4476 11.1154 14.1017 9.52175 14.0924 7.86301C14.0771 4.39626 11.2732 1.58836 7.80657 1.56841C6.14789 1.56152 4.55529 2.21805 3.38328 3.39184C2.21128 4.56563 1.55715 6.15927 1.56651 7.81801Z"
            />
          </svg>
          <p className="group-hover:text-point-green">Search</p>
        </div>
        <div className="group flex-1 flex-col flex-center cursor-pointer">
          <svg
            className="mb-0.5"
            width="24"
            height="24"
            viewBox="0 0 17 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              className="group-hover:stroke-point-green"
              d="M1.20898 19.875V3.20833C1.20898 2.6558 1.42848 2.12589 1.81918 1.73519C2.20988 1.34449 2.73978 1.125 3.29232 1.125H13.709C14.2615 1.125 14.7914 1.34449 15.1821 1.73519C15.5728 2.12589 15.7923 2.6558 15.7923 3.20833V19.875L9.62773 15.9115C9.29159 15.6952 8.90034 15.5803 8.50065 15.5803C8.10096 15.5803 7.70971 15.6952 7.37357 15.9115L1.20898 19.875Z"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <p className="group-hover:text-point-green">List</p>
        </div>
        <div className="group flex-1 flex-col flex-center cursor-pointer">
          <svg
            className="mb-0.5"
            width="24"
            height="24"
            viewBox="0 0 19 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              className="group-hover:stroke-point-green"
              d="M18.0601 19.365C18.0601 14.6371 14.2277 10.8047 9.49977 10.8047C4.77183 10.8047 0.939453 14.6371 0.939453 19.365H18.0601Z"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              className="group-hover:stroke-point-green"
              d="M9.69692 10.8108C12.2305 10.8108 14.2845 8.75691 14.2845 6.22328C14.2845 3.68965 12.2305 1.63574 9.69692 1.63574C7.16329 1.63574 5.10938 3.68965 5.10938 6.22328C5.10938 8.75691 7.16329 10.8108 9.69692 10.8108Z"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <p className="group-hover:text-point-green">My</p>
        </div>
      </div>
    </nav>
  )
}
