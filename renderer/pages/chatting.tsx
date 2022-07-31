import React from "react";
import Head from "next/head";
import SideMenu from "../layouts/SideMenu";

function Chatting() {
  return (
    <React.Fragment>
      <Head>
        <title>1:1 Chatting</title>
      </Head>
      <SideMenu category="chatting">
        <div>1:1 채팅</div>
      </SideMenu>
    </React.Fragment>
  );
}

export default Chatting;
