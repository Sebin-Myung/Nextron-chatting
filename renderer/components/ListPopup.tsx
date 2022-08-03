import Router from "next/router";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/config";
import { setAlertWithTimeOut } from "../store/slices/alertDataSlice";
import { fetchCount } from "../store/slices/countSlice";
import { UserInfo } from "../store/slices/userInfoSlice";
import { fetchUserList } from "../store/slices/userListSlice";
import { getGroupChattingId } from "../store/slices/groupChattingDataSlice";
import ItemList, { ItemListWrapper } from "./ItemList";
import ModalArea from "./ModalArea";

const ListPopup = ({ visibility, closeModal }: { visibility: boolean; closeModal: Function }) => {
  const [currentUser, setCurrentUser] = useState<UserInfo>({ uid: "", email: "", nickname: "", profileImage: "" });
  const [selectedUserList, setSelectedUserList] = useState<string[]>([]);
  const { userList, loading: userListLoading } = useAppSelector((state) => state.userList);
  const { count, loading: countLoading } = useAppSelector((state) => state.count);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setCurrentUser(() => JSON.parse(localStorage.getItem("currentUser")));
    dispatch(fetchUserList());
    dispatch(fetchCount());
  }, []);

  useEffect(() => {
    if (currentUser.uid !== "") setSelectedUserList(() => [currentUser.uid]);
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
      dispatch(getGroupChattingId(users)).then(({ payload }) => {
        Router.push({
          pathname: "/groupChatting/" + (payload || `group${count.groupChattingCount + 1}`),
          query: { users: selectedUserList },
        });
      });
    }
  };

  return (
    userListLoading === "succeeded" && (
      <ModalArea visibility={visibility} closeButtonClick={closeButtonClick}>
        <>
          <ItemListWrapper>
            {userList.map(
              (user) =>
                user.uid !== currentUser.uid && (
                  <ItemList
                    itemProps={{ uid: user.uid }}
                    key={user.uid}
                    selectOption={true}
                    onClick={() => {
                      onItemClick(user);
                    }}
                    visibility={visibility}
                  />
                ),
            )}
          </ItemListWrapper>
          <button className="btn btn-secondary rounded-xl m-2" onClick={createRoom}>
            생성
          </button>
        </>
      </ModalArea>
    )
  );
};

export default ListPopup;