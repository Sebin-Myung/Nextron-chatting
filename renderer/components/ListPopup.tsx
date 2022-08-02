import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/config";
import { setAlertWithTimeOut } from "../store/slices/alertDataSlice";
import { UserInfo } from "../store/slices/userInfoSlice";
import { fetchUserList } from "../store/slices/userListSlice";
import ItemList, { ItemListWrapper } from "./ItemList";
import ModalArea from "./ModalArea";

const ListPopup = ({ visibility, closeModal }: { visibility: boolean; closeModal: Function }) => {
  const [currentUser, setCurrentUser] = useState<UserInfo>({ uid: "", email: "", nickname: "", profileImage: "" });
  const [selectedUserList, setSelectedUserList] = useState<string[]>([]);
  const { userList, loading } = useAppSelector((state) => state.userList);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setCurrentUser(() => JSON.parse(localStorage.getItem("currentUser")));
    dispatch(fetchUserList());
  }, []);

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
    console.log(selectedUserList);
    if (selectedUserList.length < 2) setAlertWithTimeOut(dispatch, "그룹을 생성하기에 인원이 부족합니다.");
    closeButtonClick();
  };

  return (
    loading === "succeeded" && (
      <ModalArea visibility={visibility} closeButtonClick={closeButtonClick}>
        <>
          <ItemListWrapper>
            {userList.map(
              (user) =>
                user.uid !== currentUser.uid && (
                  <ItemList
                    uid={user.uid}
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
