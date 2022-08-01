import React, { useEffect, useState } from "react";
import Head from "next/head";
import Router from "next/router";
import SideMenu from "../layouts/SideMenu";
import { fetchUserList } from "../store/slices/userListSlice";
import { useAppDispatch, useAppSelector } from "../store/config";
import ItemList, { ItemListWrapper } from "../components/ItemList";
import UserProfileModal from "../components/userProfile";
import { UserInfo } from "../store/slices/userInfoSlice";

function Main() {
  const [user, setUser] = useState<UserInfo>({ uid: "", email: "", nickname: "", profileImage: "" });
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { userList, loading } = useAppSelector((state) => state.userList);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (localStorage.getItem("currentUser") === null) {
      Router.push("/login");
    } else {
      dispatch(fetchUserList());
    }
  }, []);

  const onItemClick = (userInfo: UserInfo) => {
    setUser(() => userInfo);
    setIsProfileOpen(true);
  };

  if (loading === "idle") return <div>Loading...</div>;

  return (
    <React.Fragment>
      <Head>
        <title>Main Page</title>
      </Head>
      <SideMenu category="userList">
        <>
          <ItemListWrapper>
            {userList.map((user) => (
              <ItemList
                user={user}
                key={user.uid}
                onClick={() => {
                  onItemClick(user);
                }}
              />
            ))}
          </ItemListWrapper>
          <UserProfileModal
            user={user}
            visibility={isProfileOpen}
            closeModal={() => {
              setIsProfileOpen(false);
            }}
          />
        </>
      </SideMenu>
    </React.Fragment>
  );
}

export default Main;
