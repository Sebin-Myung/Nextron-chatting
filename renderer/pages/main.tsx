import React, { useEffect, useState } from "react";
import Head from "next/head";
import Router from "next/router";
import SideMenu from "../layouts/SideMenu";

function Main() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("currentUser") === null) Router.push("/login");
    else setIsLoading(false);
  }, []);

  if (isLoading) return <div>Loading...</div>;

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
