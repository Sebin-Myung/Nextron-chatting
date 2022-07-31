import React from "react";
import Head from "next/head";
import SideMenu from "../layouts/SideMenu";

function GroupChatting() {
  return (
    <React.Fragment>
      <Head>
        <title>Group Chatting</title>
      </Head>
      <SideMenu category="groupChatting">
        <div>그룹 채팅</div>
      </SideMenu>
    </React.Fragment>
  );
}

export default GroupChatting;
