import React, { useState } from "react";
import Head from "next/head";
import SideMenu from "../layouts/SideMenu";
import AddButton from "../components/AddButton";
import ListPopup from "../components/ListPopup";

function GroupChatting() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <React.Fragment>
      <Head>
        <title>Group Chatting</title>
      </Head>
      <SideMenu category="groupChatting">
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
      </SideMenu>
    </React.Fragment>
  );
}

export default GroupChatting;
