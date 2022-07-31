import React, { useEffect } from "react";
import Head from "next/head";
import Router from "next/router";
import { getAuth, onAuthStateChanged } from "firebase/auth";

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
      <div>메인 페이지</div>
    </React.Fragment>
  );
}

export default Main;
