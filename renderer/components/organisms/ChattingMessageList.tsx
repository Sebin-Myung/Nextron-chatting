import { ChattingData } from "../../config/chattingData";
import { getFullDate, getTime, isDifferentDay } from "../../functions/dateFunctions";
import { UserInfo } from "../../store/slices/userInfoSlice";
import ChattingNoticeBox from "../atoms/ChattingNoticeBox";
import MessageBox from "../molecules/MessageBox";

export interface ChattingMessageListProps {
  chattingData: ChattingData;
  currentUserUid: string;
  userInfos: { [uid: string]: UserInfo };
}

const ChattingMessageList = ({ chattingData, currentUserUid, userInfos }: ChattingMessageListProps) => {
  return (
    <div className="grow w-full bg-rose-50 p-2 overflow-y-auto flex flex-col-reverse gap-2">
      {chattingData?.messages.map((messageData, index) => (
        <div key={`${messageData.timestamp}_div`} className="flex flex-col-reverse gap-2">
          <MessageBox
            key={messageData.timestamp}
            type={messageData.uid === currentUserUid ? "me" : "others"}
            nickname={userInfos[messageData.uid]?.nickname}
            message={messageData.message}
            time={getTime(new Date(messageData.timestamp))}
          />
          {(index === chattingData.messages.length - 1 ||
            isDifferentDay(messageData.timestamp, chattingData.messages[index + 1].timestamp)) && (
            <ChattingNoticeBox key={`start_${messageData.timestamp}`}>
              {getFullDate(messageData.timestamp)}
            </ChattingNoticeBox>
          )}
        </div>
      )) || <ChattingNoticeBox>메세지를 입력해 채팅방을 생성해보세요!</ChattingNoticeBox>}
    </div>
  );
};

export default ChattingMessageList;
