import React, { useEffect } from "react";
import Head from "next/head";
import SideMenu from "../../layouts/SideMenu";
import { GetServerSideProps } from "next";
import { useAppDispatch, useAppSelector } from "../../store/config";
import { fetchGroupChattingData } from "../../store/slices/groupChattingDataSlice";

export const getServerSideProps: GetServerSideProps = async ({ query: { groupId } }) => {
  return { props: { groupId } };
};

function GroupChattingRoom({ groupId }: { groupId: string }) {
  const { groupChattingData, loading: groupChattingDataLoading } = useAppSelector((state) => state.groupChattingData);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchGroupChattingData(groupId));
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>Group Chatting</title>
      </Head>
      <SideMenu category="groupChatting">
        <div>그룹채팅방</div>
      </SideMenu>
    </React.Fragment>
  );
}

export default GroupChattingRoom;
