import { GetServerSideProps } from "next";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import BackButton from "../../components/BackButton";
import SideMenu from "../../layouts/SideMenu";
import { useAppDispatch, useAppSelector } from "../../store/config";
import { fetchUserInfo, resetUserInfo } from "../../store/slices/userInfoSlice";

export const getServerSideProps: GetServerSideProps = async ({ query: { uid_uid } }) => {
  return { props: { uid_uid } };
};

const personalChatting = ({ uid_uid }: { uid_uid: string }) => {
  const [chattingUserList, setChattingUserList] = useState<string[]>([]);
  const { userInfo, loading: userInfoLoading } = useAppSelector((state) => state.userInfo);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(resetUserInfo());
    setChattingUserList(uid_uid.split("_"));
  }, []);

  useEffect(() => {
    chattingUserList.forEach((uid) => {
      dispatch(fetchUserInfo(uid));
    });
  }, [chattingUserList]);

  return (
    <React.Fragment>
      <Head>
        <title>1:1 Chatting</title>
      </Head>
      <SideMenu category="chatting">
        {userInfoLoading !== "succeeded" || userInfo.length !== 2 ? (
          <div>Loading...</div>
        ) : (
          <div className="relative w-full h-full">
            <BackButton />
            <div>
              {userInfo.map((user) => (
                <p key={user.uid}>{user.nickname}</p>
              ))}
            </div>
          </div>
        )}
      </SideMenu>
    </React.Fragment>
  );
};

export default personalChatting;
