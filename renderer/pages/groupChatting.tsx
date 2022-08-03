import React, { useEffect, useState } from "react";
import Head from "next/head";
import SideMenu from "../layouts/SideMenu";
import AddButton from "../components/AddButton";
import ListPopup from "../components/ListPopup";
import { useAppDispatch, useAppSelector } from "../store/config";
import { fetchGroupChattingList } from "../store/slices/groupChattingListSlice";
import { UserInfo } from "../store/slices/userInfoSlice";
import ItemList, { ItemListWrapper } from "../components/ItemList";
import Router from "next/router";
import NoRooms from "../components/NoRooms";

function GroupChatting() {
  const [currentUser, setCurrentUser] = useState<UserInfo>({ uid: "", email: "", nickname: "", profileImage: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { groupChattingList, loading: groupChattingListLoading } = useAppSelector((state) => state.groupChattingList);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setCurrentUser(() => JSON.parse(localStorage.getItem("currentUser")));
  }, []);

  useEffect(() => {
    dispatch(fetchGroupChattingList(currentUser.uid));
  }, [currentUser]);

  return (
    <React.Fragment>
      <Head>
        <title>Group Chatting</title>
      </Head>
      <SideMenu category="groupChatting">
        <ItemListWrapper>
          {groupChattingListLoading !== "succeeded" ? (
            <div>Loading...</div>
          ) : groupChattingList.length === 0 ? (
            <NoRooms />
          ) : (
            groupChattingList.map((groupChatting) => (
              <ItemList
                itemProps={{ groupId: groupChatting.url }}
                key={groupChatting.url}
                message={groupChatting.lastMessage}
                onClick={() => Router.push(`/groupChatting/${groupChatting.url}`)}
              />
            ))
          )}
          <AddButton
            onClick={() => {
              setIsModalOpen(true);
            }}
          />
          <ListPopup
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
