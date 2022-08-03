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
import LoadingSpinner from "../../components/LoadingSpinner";

export const getServerSideProps: GetServerSideProps = async ({ query: { groupId, users } }) => {
  if (users) return { props: { groupId, users } };
  else return { props: { groupId } };
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
    if (users) {
      users.forEach((uid) => {
        dispatch(fetchUserInfo(uid));
      });
    } else if (groupChattingData) {
      groupChattingData.users.forEach((uid) => {
        dispatch(fetchUserInfo(uid));
      });
    }
  }, [users, groupChattingData]);

  return (
    <React.Fragment>
      <Head>
        <title>Group Chatting</title>
      </Head>
      <SideMenu category="groupChatting">
        {userInfoLoading !== "succeeded" || groupChattingDataLoading !== "succeeded" ? (
          <LoadingSpinner />
        ) : (
          <ChattingRoomArea>
            <ChattingRoomHeader title={groupChattingData.roomTitle || groupId} people={Object.keys(userInfo).length} />
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
          </ChattingRoomArea>
        )}
      </SideMenu>
    </React.Fragment>
  );
}

export default GroupChattingRoom;
