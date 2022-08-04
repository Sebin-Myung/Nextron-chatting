import React, { useEffect, useState } from "react";
import Head from "next/head";
import SideMenu from "../../layouts/SideMenu";
import { useAppDispatch, useAppSelector } from "../../store/config";
import { fetchUserInfo, resetUserInfo, UserInfo } from "../../store/slices/userInfoSlice";
import { ChattingMessageArea, ChattingNoticeBox, ChattingRoomArea } from "../../components/tailwindStyledComponents";
import ChattingRoomHeader from "../../components/ChattingRoomHeader";
import MyMessageBox from "../../components/MyMessageBox";
import OthersMessageBox from "../../components/OthersMessageBox";
import ChattingInputArea from "../../components/ChattingInputArea";
import LoadingSpinner from "../../components/LoadingSpinner";
import ListPopup from "../../components/ListPopup";
import { doc, onSnapshot, Unsubscribe } from "firebase/firestore";
import { db } from "../_app";
import { GroupChattingData } from "../../config/chattingData";

GroupChattingRoom.getInitialProps = async ({ query: { groupId, users } }) => {
  if (users) return { groupId, users };
  else return { groupId };
};

function GroupChattingRoom({ groupId, users }: { groupId: string; users?: string[] }) {
  const [currentUser, setCurrentUser] = useState<UserInfo>({ uid: "", email: "", nickname: "", profileImage: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [groupChattingData, setGroupChattingData] = useState<GroupChattingData>();
  const [stopListening, setStopListening] = useState<Unsubscribe>();
  const { userInfo, loading: userInfoLoading } = useAppSelector((state) => state.userInfo);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(resetUserInfo());
    setCurrentUser(() => JSON.parse(localStorage.getItem("currentUser")));

    const groupChattingRef = doc(db, "groupChatting", groupId);
    const getGroupChattingData = onSnapshot(groupChattingRef, { includeMetadataChanges: true }, (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        setGroupChattingData(() => {
          return {
            roomTitle: data.roomTitle,
            roomProfileImage: data.roomProfileImage,
            url: data.url,
            users: data.users,
            messages: data.messages.reverse(),
            lastMessage: data.lastMessage,
          };
        });
      }
    });
    setStopListening(() => getGroupChattingData);
  }, []);

  useEffect(() => {
    if (users) {
      users.forEach((uid) => {
        dispatch(fetchUserInfo(uid));
      });
    } else {
      groupChattingData?.users.forEach((uid) => {
        dispatch(fetchUserInfo(uid));
      });
    }
  }, [groupChattingData]);

  useEffect(() => {
    return () => {
      stopListening;
    };
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>Group Chatting</title>
      </Head>
      <SideMenu category="groupChatting">
        {userInfoLoading !== "succeeded" && Object.keys(userInfo).length < 3 ? (
          <LoadingSpinner />
        ) : (
          <ChattingRoomArea>
            <ChattingRoomHeader
              title={groupChattingData?.roomTitle || groupId}
              people={users ? users.length : groupChattingData?.users.length}
              onPeopleClick={() => setIsModalOpen(true)}
            />
            <ChattingMessageArea>
              {groupChattingData?.messages ? (
                groupChattingData.messages.map((messageData) =>
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
                      nickname={userInfo[messageData.uid]?.nickname}
                      timestamp={messageData.timestamp}
                    />
                  ),
                )
              ) : (
                <ChattingNoticeBox>메세지를 입력해 채팅방을 생성해보세요!</ChattingNoticeBox>
              )}
            </ChattingMessageArea>
            <ChattingInputArea category="groupChatting" currentUserUid={currentUser.uid} url={groupId} users={users} />
            <ListPopup
              visibility={isModalOpen}
              closeModal={() => {
                setIsModalOpen(false);
              }}
              users={users || groupChattingData?.users}
            />
          </ChattingRoomArea>
        )}
      </SideMenu>
    </React.Fragment>
  );
}

export default GroupChattingRoom;
