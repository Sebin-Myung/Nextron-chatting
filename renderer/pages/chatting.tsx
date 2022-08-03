import React, { useEffect, useState } from "react";
import Head from "next/head";
import SideMenu from "../layouts/SideMenu";
import ItemList, { ItemListWrapper } from "../components/ItemList";
import { useAppDispatch, useAppSelector } from "../store/config";
import { fetchPersonalChattingList } from "../store/slices/personalChattingListSlice";
import { UserInfo } from "../store/slices/userInfoSlice";
import Router from "next/router";
import NoRooms from "../components/NoRooms";
import LoadingSpinner from "../components/LoadingSpinner";

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
        <>
          {personalChattingListLoading !== "succeeded" ? (
            <LoadingSpinner />
          ) : personalChattingList.length === 0 ? (
            <NoRooms />
          ) : (
            <ItemListWrapper>
              {personalChattingList.map((personalChatting) => (
                <ItemList
                  itemProps={{ uid: getContactUser(personalChatting.users) }}
                  key={personalChatting.lastMessage.timestamp}
                  message={personalChatting.lastMessage}
                  onClick={() => Router.push(`/chatting/${personalChatting.url}`)}
                />
              ))}
            </ItemListWrapper>
          )}
        </>
      </SideMenu>
    </React.Fragment>
  );
}

export default Chatting;
