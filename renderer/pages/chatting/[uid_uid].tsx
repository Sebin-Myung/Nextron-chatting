import { doc, onSnapshot, Unsubscribe } from "firebase/firestore";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import ChattingInputArea from "../../components/ChattingInputArea";
import ChattingRoomHeader from "../../components/ChattingRoomHeader";
import LoadingSpinner from "../../components/LoadingSpinner";
import MyMessageBox from "../../components/MyMessageBox";
import OthersMessageBox from "../../components/OthersMessageBox";
import { ChattingMessageArea, ChattingNoticeBox, ChattingRoomArea } from "../../components/tailwindStyledComponents";
import { ChattingData } from "../../config/chattingData";
import SideMenu from "../../layouts/SideMenu";
import { useAppDispatch, useAppSelector } from "../../store/config";
import { fetchUserInfo, resetUserInfo, UserInfo } from "../../store/slices/userInfoSlice";
import { db } from "../_app";

export const isDifferentDay = (currentTimestamp: number, prevTimeStamp: number) => {
  const currentDate = new Date(currentTimestamp);
  const prevDate = new Date(prevTimeStamp);
  if (currentDate.toDateString() !== prevDate.toDateString()) return true;
  else return false;
};

export const getFullDate = (timestamp: number) => {
  const date = new Date(timestamp);
  const week = ["일", "월", "화", "수", "목", "금", "토"];
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일 ${week[date.getDay()]}요일`;
};

PersonalChatting.getInitialProps = async ({ query: { uid_uid } }) => {
  return { uid_uid };
};

function PersonalChatting({ uid_uid }: { uid_uid: string }) {
  const [currentUser, setCurrentUser] = useState<UserInfo>({ uid: "", email: "", nickname: "", profileImage: "" });
  const [chattingUserList, setChattingUserList] = useState<string[]>([]);
  const [title, setTitle] = useState<string>("");
  const [chattingData, setChattingData] = useState<ChattingData>();
  const [stopListening, setStopListening] = useState<Unsubscribe>();
  const { userInfo, loading: userInfoLoading } = useAppSelector((state) => state.userInfo);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(resetUserInfo());
    setChattingUserList(uid_uid.split("_"));
    setCurrentUser(() => JSON.parse(localStorage.getItem("currentUser")));

    const chattingRef = doc(db, "chatting", uid_uid);
    const getChattingData = onSnapshot(chattingRef, { includeMetadataChanges: true }, (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        setChattingData(() => {
          return {
            url: data.url,
            users: data.users,
            messages: data.messages.reverse(),
            lastMessage: data.lastMessage,
          };
        });
      }
    });
    setStopListening(() => getChattingData);
  }, []);

  useEffect(() => {
    chattingUserList.forEach((uid) => {
      dispatch(fetchUserInfo(uid));
    });
  }, [chattingUserList]);

  useEffect(() => {
    const uidList = Object.keys(userInfo);
    for (let i = 0; i < uidList.length; i++) {
      if (uidList[i] !== currentUser.uid) {
        setTitle(userInfo[uidList[i]].nickname);
        break;
      }
    }
  }, [Object.keys(userInfo).length === 2]);

  useEffect(() => {
    return () => {
      stopListening;
    };
  }, []);

  if (currentUser === null) return <div>잘못된 접근입니다.</div>;

  return (
    <React.Fragment>
      <Head>
        <title>1:1 Chatting</title>
      </Head>
      <SideMenu category="chatting">
        {userInfoLoading !== "succeeded" || Object.keys(userInfo).length !== 2 ? (
          <LoadingSpinner />
        ) : (
          <ChattingRoomArea>
            <ChattingRoomHeader title={title} />
            <ChattingMessageArea>
              {chattingData?.messages ? (
                chattingData.messages.map((messageData, index) => (
                  <div key={`${messageData.timestamp}_div`} className="flex flex-col-reverse">
                    {messageData.uid === currentUser.uid ? (
                      <MyMessageBox
                        key={messageData.timestamp}
                        message={messageData.message}
                        timestamp={messageData.timestamp}
                      />
                    ) : (
                      <OthersMessageBox
                        key={messageData.timestamp}
                        message={messageData.message}
                        nickname={userInfo[messageData.uid].nickname}
                        timestamp={messageData.timestamp}
                      />
                    )}
                    {(index === chattingData.messages.length - 1 ||
                      isDifferentDay(messageData.timestamp, chattingData.messages[index + 1].timestamp)) && (
                      <ChattingNoticeBox className="mt-4" key={`start_${messageData.timestamp}`}>
                        {getFullDate(messageData.timestamp)}
                      </ChattingNoticeBox>
                    )}
                  </div>
                ))
              ) : (
                <ChattingNoticeBox>메세지를 입력해 채팅방을 생성해보세요!</ChattingNoticeBox>
              )}
            </ChattingMessageArea>
            <ChattingInputArea category="personalChatting" currentUserUid={currentUser.uid} url={uid_uid} />
          </ChattingRoomArea>
        )}
      </SideMenu>
    </React.Fragment>
  );
}

export default PersonalChatting;
