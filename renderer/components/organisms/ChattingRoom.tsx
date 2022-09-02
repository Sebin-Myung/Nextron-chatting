import ChattingInputArea, { ChattingInputAreaProps } from "./ChattingInputArea";
import ChattingMessageList, { ChattingMessageListProps } from "./ChattingMessageList";
import ChattingRoomHeader, { ChattingRoomHeaderProps } from "./ChattingRoomHeader";

interface ChattingRoomProps extends ChattingRoomHeaderProps, ChattingMessageListProps, ChattingInputAreaProps {
  children?: JSX.Element;
}

const ChattingRoom = ({
  title,
  groupPersonnel,
  onPeopleClick,
  chattingData,
  currentUserUid,
  userInfos,
  category,
  url,
  users,
  children,
}: ChattingRoomProps) => {
  return (
    <div className="w-full min-w-[18rem] h-screen flex flex-col">
      <ChattingRoomHeader title={title} groupPersonnel={groupPersonnel} onPeopleClick={onPeopleClick} />
      <ChattingMessageList chattingData={chattingData} currentUserUid={currentUserUid} userInfos={userInfos} />
      <ChattingInputArea category={category} currentUserUid={currentUserUid} url={url} users={users} />
      {children}
    </div>
  );
};

export default ChattingRoom;
