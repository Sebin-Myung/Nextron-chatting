import React, { useEffect, useState } from "react";
import Head from "next/head";
import SideMenu from "../layouts/SideMenu";
import AddButton from "../components/AddButton";
import ListPopup from "../components/ListPopup";
import { UserInfo } from "../store/slices/userInfoSlice";
import ItemList, { ItemListWrapper } from "../components/ItemList";
import Router from "next/router";
import NoRooms from "../components/NoRooms";
import LoadingSpinner from "../components/LoadingSpinner";
import { query, collection, where, onSnapshot, Unsubscribe } from "firebase/firestore";
import { db } from "./_app";
import { GroupChattingData } from "../config/chattingData";

function GroupChatting() {
  const [currentUser, setCurrentUser] = useState<UserInfo>({ uid: "", email: "", nickname: "", profileImage: "" });
  const [groupChattingList, setGroupChattingList] = useState<GroupChattingData[]>();
  const [stopListening, setStopListening] = useState<Unsubscribe>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setCurrentUser(() => JSON.parse(localStorage.getItem("currentUser")));
  }, []);

  useEffect(() => {
    const groupChattingQuery = query(
      collection(db, "groupChatting"),
      where("users", "array-contains", currentUser?.uid),
    );
    const getGroupChattingList = onSnapshot(groupChattingQuery, (querySnapshot) => {
      const result: GroupChattingData[] = [];
      querySnapshot.forEach((doc) => {
        result.push(doc.data() as GroupChattingData);
      });
      result.sort((a, b) => b.lastMessage.timestamp - a.lastMessage.timestamp);
      setGroupChattingList(() => result);
    });
    setStopListening(() => getGroupChattingList);
  }, [currentUser]);

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
        <ItemListWrapper>
          {!groupChattingList ? (
            <LoadingSpinner />
          ) : groupChattingList.length === 0 ? (
            <NoRooms />
          ) : (
            <>
              {groupChattingList.map((groupChatting) => (
                <ItemList
                  itemProps={{ groupId: groupChatting.url }}
                  key={groupChatting.url}
                  message={groupChatting.lastMessage}
                  onClick={() => Router.push(`/groupChatting/${groupChatting.url}`)}
                />
              ))}
            </>
          )}
          <AddButton
            onClick={() => {
              setIsModalOpen(true);
            }}
          />
          <ListPopup
            selectOption={true}
            visibility={isModalOpen}
            closeModal={() => {
              setIsModalOpen(false);
            }}
          />
        </ItemListWrapper>
      </SideMenu>
    </React.Fragment>
  );
}

export default GroupChatting;
