import React, { useEffect, useState } from "react";
import Head from "next/head";
import SideMenu from "../layouts/SideMenu";
import AddButton from "../components/AddButton";
import ListPopup from "../components/ListPopup";
import { useAppDispatch, useAppSelector } from "../store/config";
import { fetchGroupChattingList } from "../store/slices/groupChattingListSlice";
import { UserInfo } from "../store/slices/userInfoSlice";
import ItemList from "../components/ItemList";
import Router from "next/router";

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

  if (groupChattingListLoading === "idle") return <div>Loading...</div>;

  return (
    <React.Fragment>
      <Head>
        <title>Group Chatting</title>
      </Head>
      <SideMenu category="groupChatting">
        <>
          {groupChattingList.length === 0 ? (
            <p>생성된 채팅방이 없습니다.</p>
          ) : (
            groupChattingList.map((groupChatting) => (
              <ItemList
                key={groupChatting.lastMessage.timestamp}
                title={groupChatting.roomTitle}
                image={groupChatting.roomProfileImage}
                message={groupChatting.lastMessage}
                onClick={() => Router.push(`/groupChatting/${groupChatting.url}`)}
              />
            ))
          )}
          <div>
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
          </div>
        </>
      </SideMenu>
    </React.Fragment>
  );
}

export default GroupChatting;
