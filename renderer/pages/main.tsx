import React, { useEffect } from "react";
import Head from "next/head";
import Router from "next/router";
import { getAuth } from "firebase/auth";
import SideMenu from "../layouts/SideMenu";

function Main() {
  const auth = getAuth();

  useEffect(() => {
    if (localStorage.getItem("currentUser") === null) Router.push("/login");
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>Main Page</title>
      </Head>
      <SideMenu category="userList">
        <div>메인 페이지</div>
      </SideMenu>
    </React.Fragment>
  );
}

export default Main;
