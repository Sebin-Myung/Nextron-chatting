import { collection, getDocs, query, where } from "firebase/firestore";
import Router from "next/router";
import { useEffect, useState } from "react";
import { GroupChattingData } from "../../config/chattingData";
import { db } from "../../pages/_app";
import { useAppDispatch, useAppSelector } from "../../store/config";
import { setAlertWithTimeOut } from "../../store/slices/alertDataSlice";
import { UserInfo } from "../../store/slices/userInfoSlice";
import Button from "../atoms/Button";
import { UserListItemProps } from "../molecules/UserListItem";
import PopupArea from "./PopupArea";
import UserList from "./UserList";

interface ListPopupProps {
  currentUserUid: string;
  visibility: boolean;
  closeModal: Function;
  checkOption?: boolean;
  users: UserInfo[];
}

const ListPopup = ({ currentUserUid, visibility, closeModal, checkOption = false, users }: ListPopupProps) => {
  const [selectedUserList, setSelectedUserList] = useState<string[]>([currentUserUid]);
  const { count, loading: countLoading } = useAppSelector((state) => state.count);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (checkOption && currentUserUid !== "") setSelectedUserList(() => [currentUserUid]);
  }, [currentUserUid]);

  const onItemClick = (uid: string) => {
    if (selectedUserList.includes(uid)) {
      const result = [...selectedUserList].filter((selectedUid) => selectedUid !== uid);
      setSelectedUserList(() => result);
    } else {
      setSelectedUserList([...selectedUserList, uid]);
    }
  };

  const userListItemDatas: UserListItemProps[] = users.map((user) => ({
    data: {
      uid: user.uid,
      image: user.profileImage,
      title: user.nickname,
      checkOption: checkOption,
    },
    onClick: checkOption ? onItemClick : () => {},
  }));

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
    <PopupArea visibility={visibility} closeButtonClick={checkOption ? closeButtonClick : closeModal}>
      <>
        <UserList
          currentUserUid={currentUserUid}
          visibility={visibility}
          checkOption={checkOption}
          userListItemDatas={userListItemDatas}
        />
        {/* <ItemListWrapper>
            {checkOption
              ? userList.map(
                  (user) =>
                    user.uid !== currentUser.uid && (
                      <ItemList
                        itemProps={{ uid: user.uid }}
                        key={user.uid}
                        checkOption={true}
                        onClick={() => onItemClick(user)}
                        visibility={visibility}
                      />
                    ),
                )
              : users?.map((user) => <ItemList itemProps={{ uid: user }} key={user} />)}
          </ItemListWrapper> */}
        {checkOption && (
          <div className="w-full p-2">
            <Button fullWidth color="secondary" rounded="xl" onClick={createRoom}>
              생성
            </Button>
          </div>
          // <button className="btn btn-secondary rounded-xl m-2" onClick={createRoom}>
          //   생성
          // </button>
        )}
      </>
    </PopupArea>
  );
};

export default ListPopup;
