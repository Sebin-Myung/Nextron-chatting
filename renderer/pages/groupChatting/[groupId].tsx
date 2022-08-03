import React, { useEffect, useState } from "react";
import Head from "next/head";
import SideMenu from "../../layouts/SideMenu";
import { GetServerSideProps } from "next";
import { useAppDispatch, useAppSelector } from "../../store/config";
import { fetchGroupChattingData } from "../../store/slices/groupChattingDataSlice";
import { fetchUserInfo, resetUserInfo, UserInfo } from "../../store/slices/userInfoSlice";
import { ChattingMessageArea, ChattingNoticeBox, ChattingRoomArea } from "../../components/tailwindStyledComponents";
import ChattingRoomHeader from "../../components/ChattingRoomHeader";
import MyMessageBox from "../../components/MyMessageBox";
import OthersMessageBox from "../../components/OthersMessageBox";
import ChattingInputArea from "../../components/ChattingInputArea";

export const getServerSideProps: GetServerSideProps = async ({ query: { groupId, users } }) => {
  return { props: { groupId, users } };
};

function GroupChattingRoom({ groupId, users }: { groupId: string; users?: string[] }) {
  const [currentUser, setCurrentUser] = useState<UserInfo>({ uid: "", email: "", nickname: "", profileImage: "" });
  const { userInfo, loading: userInfoLoading } = useAppSelector((state) => state.userInfo);
  const { groupChattingData, loading: groupChattingDataLoading } = useAppSelector((state) => state.groupChattingData);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(resetUserInfo());
    dispatch(fetchGroupChattingData(groupId));
    setCurrentUser(() => JSON.parse(localStorage.getItem("currentUser")));
  }, []);

  useEffect(() => {
    users.forEach((uid) => {
      dispatch(fetchUserInfo(uid));
    });
  }, [Object.keys(userInfo).length === 0]);

  return (
    <React.Fragment>
      <Head>
        <title>Group Chatting</title>
      </Head>
      <SideMenu category="groupChatting">
        {userInfoLoading !== "succeeded" || Object.keys(userInfo).length !== users.length ? (
          <div>Loading...</div>
        ) : (
          <ChattingRoomArea>
            <ChattingRoomHeader title={groupChattingData.roomTitle || groupId} />
            <ChattingMessageArea>
              {groupChattingData.messages ? (
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
                      nickname={userInfo[messageData.uid].nickname}
                      timestamp={messageData.timestamp}
                    />
                  ),
                )
              ) : (
                <ChattingNoticeBox>메세지를 입력해 채팅방을 생성해보세요!</ChattingNoticeBox>
              )}
            </ChattingMessageArea>
            <ChattingInputArea category="groupChatting" currentUserUid={currentUser.uid} url={groupId} users={users} />
          </ChattingRoomArea>
        )}
      </SideMenu>
    </React.Fragment>
  );
}

export default GroupChattingRoom;
