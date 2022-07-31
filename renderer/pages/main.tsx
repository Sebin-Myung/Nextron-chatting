import React, { useEffect } from "react";
import Head from "next/head";
import Router from "next/router";
import SideMenu from "../layouts/SideMenu";
import { fetchUserList } from "../store/slices/userListSlice";
import { useAppDispatch, useAppSelector } from "../store/config";
import ItemList from "../components/ItemList";

function Main() {
  const { userList, loading } = useAppSelector((state) => state.userList);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (localStorage.getItem("currentUser") === null) {
      Router.push("/login");
    } else {
      dispatch(fetchUserList());
    }
  }, []);

  if (loading === "idle") return <div>Loading...</div>;

  return (
    <React.Fragment>
      <Head>
        <title>Main Page</title>
      </Head>
      <SideMenu category="userList">
        <ul className="menu w-full h-screen overflow-y-auto">
          {userList.map((user) => (
            <ItemList user={user} key={user.uid} />
          ))}
        </ul>
      </SideMenu>
    </React.Fragment>
  );
}

export default Main;
