import { doc, onSnapshot } from "firebase/firestore";
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

PersonalChatting.getInitialProps = async ({ query: { uid_uid } }) => {
  return { uid_uid };
};

function PersonalChatting({ uid_uid }: { uid_uid: string }) {
  const [currentUser, setCurrentUser] = useState<UserInfo>({ uid: "", email: "", nickname: "", profileImage: "" });
  const [chattingUserList, setChattingUserList] = useState<string[]>([]);
  const [title, setTitle] = useState<string>("");
  const [chattingData, setChattingData] = useState<ChattingData>();
  const { userInfo, loading: userInfoLoading } = useAppSelector((state) => state.userInfo);
  const dispatch = useAppDispatch();

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

  useEffect(() => {
    dispatch(resetUserInfo());
    setChattingUserList(uid_uid.split("_"));
    setCurrentUser(() => JSON.parse(localStorage.getItem("currentUser")));
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
            <ChattingRoomHeader title={title} stopListening={getChattingData} />
            <ChattingMessageArea>
              {chattingData.messages ? (
                chattingData.messages.map((messageData) =>
                  messageData.uid === currentUser.uid ? (
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
                  ),
                )
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
