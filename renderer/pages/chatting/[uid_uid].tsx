import { GetServerSideProps } from "next";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import ChattingInputArea from "../../components/ChattingInputArea";
import ChattingRoomHeader from "../../components/ChattingRoomHeader";
import SideMenu from "../../layouts/SideMenu";
import { useAppDispatch, useAppSelector } from "../../store/config";
import { fetchUserInfo, resetUserInfo, UserInfo } from "../../store/slices/userInfoSlice";

export const getServerSideProps: GetServerSideProps = async ({ query: { uid_uid } }) => {
  return { props: { uid_uid } };
};

const personalChatting = ({ uid_uid }: { uid_uid: string }) => {
  const [currentUser, setCurrentUser] = useState<UserInfo>({ uid: "", email: "", nickname: "", profileImage: "" });
  const [chattingUserList, setChattingUserList] = useState<string[]>([]);
  const [title, setTitle] = useState<string>("");
  const { userInfo, loading: userInfoLoading } = useAppSelector((state) => state.userInfo);
  const dispatch = useAppDispatch();

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
          <div>Loading...</div>
        ) : (
          <div className="w-full h-screen flex flex-col">
            <ChattingRoomHeader title={title} />
            <div className="grow w-full bg-rose-50 overflow-y-auto">
              <p>채팅방</p>
            </div>
            <ChattingInputArea currentUserUid={currentUser.uid} uid_uid={uid_uid} />
          </div>
        )}
      </SideMenu>
    </React.Fragment>
  );
};

export default personalChatting;
