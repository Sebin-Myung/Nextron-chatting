const ChattingNoticeBox = ({children}: {children: string}) => {
  return (
    <div className="bg-secondary rounded-full w-fit text-sm text-secondary-content px-4 py-1">
      {children}
    </div>
  )
}

export default ChattingNoticeBox