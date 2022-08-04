import Router from "next/router";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/config";
import { setAlertWithTimeOut } from "../store/slices/alertDataSlice";
import { fetchCount } from "../store/slices/countSlice";
import { UserInfo } from "../store/slices/userInfoSlice";
import { fetchUserList } from "../store/slices/userListSlice";
import ItemList, { ItemListWrapper } from "./ItemList";
import ModalArea from "./ModalArea";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../pages/_app";
import { GroupChattingData } from "../config/chattingData";

interface ListPopupProps {
  visibility: boolean;
  closeModal: Function;
  selectOption?: boolean;
  users?: string[];
}

const ListPopup = ({ visibility, closeModal, selectOption = false, users }: ListPopupProps) => {
  const [currentUser, setCurrentUser] = useState<UserInfo>({ uid: "", email: "", nickname: "", profileImage: "" });
  const [selectedUserList, setSelectedUserList] = useState<string[]>([]);
  const { userList, loading: userListLoading } = useAppSelector((state) => state.userList);
  const { count, loading: countLoading } = useAppSelector((state) => state.count);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setCurrentUser(() => JSON.parse(localStorage.getItem("currentUser")));
    if (selectOption) {
      dispatch(fetchUserList());
      dispatch(fetchCount());
    }
  }, []);

  useEffect(() => {
    if (selectOption && currentUser.uid !== "") setSelectedUserList(() => [currentUser.uid]);
  }, [currentUser]);

  const onItemClick = (user: UserInfo) => {
    if (selectedUserList.includes(user.uid)) {
      const result = [...selectedUserList].filter((uid) => uid !== user.uid);
      setSelectedUserList(() => result);
    } else {
      setSelectedUserList([...selectedUserList, user.uid]);
    }
  };

  const closeButtonClick = () => {
    setSelectedUserList([]);
    closeModal();
  };

  const createRoom = () => {
    if (selectedUserList.length < 3) {
      setAlertWithTimeOut(dispatch, "그룹을 생성하기에 인원이 부족합니다.");
    } else {
      const users = [...selectedUserList];
      users.sort();
      setSelectedUserList(() => users);

      const getGroupChattingId = async (users: string[]) => {
        const groupChattingRef = collection(db, "groupChatting");
        const groupChattingSnapshot = await getDocs(query(groupChattingRef, where("users", "in", [users])));
        return groupChattingSnapshot.empty ? null : (groupChattingSnapshot[0].data() as GroupChattingData).url;
      };
      getGroupChattingId(users).then((groupId) => {
        Router.push({
          pathname: "/groupChatting/" + (groupId || `group${count.groupChattingCount + 1}`),
          query: { users: selectedUserList },
        });
      });
    }
  };

  return (
    userListLoading === "succeeded" && (
      <ModalArea visibility={visibility} closeButtonClick={selectOption ? closeButtonClick : closeModal}>
        <>
          <ItemListWrapper>
            {selectOption
              ? userList.map(
                  (user) =>
                    user.uid !== currentUser.uid && (
                      <ItemList
                        itemProps={{ uid: user.uid }}
                        key={user.uid}
                        selectOption={true}
                        onClick={() => onItemClick(user)}
                        visibility={visibility}
                      />
                    ),
                )
              : users?.map((user) => <ItemList itemProps={{ uid: user }} key={user} />)}
          </ItemListWrapper>
          {selectOption && (
            <button className="btn btn-secondary rounded-xl m-2" onClick={createRoom}>
              생성
            </button>
          )}
        </>
      </ModalArea>
    )
  );
};

export default ListPopup;
