import React, { useEffect, useState } from "react";
import Head from "next/head";
import SideMenu from "../layouts/SideMenu";
import ItemList, { ItemListWrapper } from "../components/ItemList";
import { useAppDispatch, useAppSelector } from "../store/config";
import { fetchPersonalChattingList } from "../store/slices/personalChattingListSlice";
import { UserInfo } from "../store/slices/userInfoSlice";
import Router from "next/router";

function Chatting() {
  const [currentUser, setCurrentUser] = useState<UserInfo>({ uid: "", email: "", nickname: "", profileImage: "" });
  const { personalChattingList, loading: personalChattingListLoading } = useAppSelector(
    (state) => state.personalChattingList,
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    setCurrentUser(() => JSON.parse(localStorage.getItem("currentUser")));
  }, []);

  useEffect(() => {
    dispatch(fetchPersonalChattingList(currentUser.uid));
  }, [currentUser]);

  const getContactUser = (member: string[]) => {
    return member[0] === currentUser.uid ? member[1] : member[0];
  };

  return (
    <React.Fragment>
      <Head>
        <title>1:1 Chatting</title>
      </Head>
      <SideMenu category="chatting">
        <ItemListWrapper>
          <div className="divider m-0 h-fit"></div>
          {personalChattingList ? (
            personalChattingList.map((personalChatting) => (
              <ItemList
                key={personalChatting.lastMessage.timestamp}
                uid={getContactUser(personalChatting.users)}
                message={personalChatting.lastMessage}
                onClick={() => Router.push(`/chatting/${personalChatting.url}`)}
              />
            ))
          ) : (
            <p>생성된 채팅방이 없습니다.</p>
          )}
        </ItemListWrapper>
      </SideMenu>
    </React.Fragment>
  );
}

export default Chatting;
