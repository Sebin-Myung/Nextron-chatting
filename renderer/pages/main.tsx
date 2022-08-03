import React, { useEffect, useState } from "react";
import Head from "next/head";
import Router from "next/router";
import SideMenu from "../layouts/SideMenu";
import { fetchUserList } from "../store/slices/userListSlice";
import { useAppDispatch, useAppSelector } from "../store/config";
import ItemList, { ItemListWrapper } from "../components/ItemList";
import UserProfileModal from "../components/userProfile";
import { UserInfo } from "../store/slices/userInfoSlice";
import LoadingSpinner from "../components/LoadingSpinner";

function Main() {
  const [currentUser, setCurrentUser] = useState<UserInfo>({ uid: "", email: "", nickname: "", profileImage: "" });
  const [user, setUser] = useState<UserInfo>({ uid: "", email: "", nickname: "", profileImage: "" });
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { userList, loading: userListLoading } = useAppSelector((state) => state.userList);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setCurrentUser(() => JSON.parse(localStorage.getItem("currentUser")));
  }, []);

  useEffect(() => {
    if (currentUser === null) {
      Router.push("/login");
    } else {
      dispatch(fetchUserList());
    }
  }, [currentUser]);

  const onItemClick = (userInfo: UserInfo) => {
    setUser(() => userInfo);
    setIsProfileOpen(true);
  };

  return (
    <React.Fragment>
      <Head>
        <title>Main Page</title>
      </Head>
      <SideMenu category="userList">
        {currentUser === null || userListLoading !== "succeeded" ? (
          <LoadingSpinner />
        ) : (
          <>
            <ItemListWrapper>
              <ItemList itemProps={{ uid: currentUser.uid }} key={currentUser.uid} />
              <div className="divider m-0 h-fit"></div>
              {userList.map(
                (user) =>
                  user.uid !== currentUser.uid && (
                    <ItemList
                      itemProps={{ uid: user.uid }}
                      key={user.uid}
                      onClick={() => {
                        onItemClick(user);
                      }}
                    />
                  ),
              )}
            </ItemListWrapper>
            <UserProfileModal
              currentUser={currentUser}
              user={user}
              visibility={isProfileOpen}
              closeModal={() => {
                setIsProfileOpen(false);
              }}
            />
          </>
        )}
      </SideMenu>
    </React.Fragment>
  );
}

export default Main;
