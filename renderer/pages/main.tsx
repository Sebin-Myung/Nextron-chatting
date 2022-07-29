import React from "react";
import Head from "next/head";
import Router from "next/router";
import { getAuth } from "firebase/auth";

function Main() {
  const user = getAuth().currentUser;
  if (typeof window !== "undefined" && user === null) Router.push("/login");
  return (
    <React.Fragment>
      <Head>
        <title>Main Page</title>
      </Head>
      <div>메인 페이지</div>
    </React.Fragment>
  );
}

export default Main;
