import Router from "next/router";
import { UserInfo } from "../store/slices/userInfoSlice";
import ModalArea from "./ModalArea";

interface UserProfileModalProps {
  currentUser: UserInfo;
  user: UserInfo;
  visibility: boolean;
  closeModal: Function;
}

const UserProfileModal = ({ currentUser, user, visibility, closeModal }: UserProfileModalProps) => {
  const getUrl = (uidList: string[]) => {
    uidList.sort();
    return uidList.join("_");
  };

  return (
    <ModalArea visibility={visibility} closeButtonClick={closeModal}>
      <>
        <div className="w-full aspect-square p-4">
          <img
            src={user.profileImage === "" ? "/images/defaultProfileImage.png" : user.profileImage}
            className="object-contain"
          />
        </div>
        <div className="flex flex-col h-full justify-between items-center">
          <p className="text-lg font-bold">{user.nickname}</p>
          <button
            className="btn btn-primary min-h-8 h-8 mb-6"
            onClick={() => {
              Router.push(`/chatting/${getUrl([currentUser.uid, user.uid])}`);
            }}
          >
            채팅하기
          </button>
        </div>
      </>
    </ModalArea>
  );
};

export default UserProfileModal;
