import React, { useEffect, useState } from "react";
import Head from "next/head";
import SideMenu from "../layouts/SideMenu";
import ItemList, { ItemListWrapper } from "../components/ItemList";
import { UserInfo } from "../store/slices/userInfoSlice";
import Router from "next/router";
import NoRooms from "../components/NoRooms";
import LoadingSpinner from "../components/LoadingSpinner";
import { ChattingData } from "../config/chattingData";
import { collection, query, where, onSnapshot, Unsubscribe } from "firebase/firestore";
import { db } from "./_app";

function Chatting() {
  const [currentUser, setCurrentUser] = useState<UserInfo>({ uid: "", email: "", nickname: "", profileImage: "" });
  const [personalChattingList, setPersonalChattingList] = useState<ChattingData[]>();
  const [stopListening, setStopListening] = useState<Unsubscribe>();

  useEffect(() => {
    setCurrentUser(() => JSON.parse(localStorage.getItem("currentUser")));
  }, []);

  useEffect(() => {
    const chattingQuery = query(collection(db, "chatting"), where("users", "array-contains", currentUser?.uid));
    const getPersonalChattingList = onSnapshot(chattingQuery, (querySnapshot) => {
      const result: ChattingData[] = [];
      querySnapshot.forEach((doc) => {
        result.push(doc.data() as ChattingData);
      });
      result.sort((a, b) => b.lastMessage.timestamp - a.lastMessage.timestamp);
      setPersonalChattingList(() => result);
    });
    setStopListening(() => getPersonalChattingList);
  }, [currentUser]);

  useEffect(() => {
    return () => {
      stopListening;
    };
  }, []);

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
          {!personalChattingList ? (
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
