import Router from "next/router";
import { MouseEventHandler } from "react";
import { UserInfo } from "../store/slices/userInfoSlice";
import CloseButton from "./CloseButton";

const UserProfileModal = ({
  currentUser,
  user,
  visibility,
  closeModal,
}: {
  currentUser: UserInfo;
  user: UserInfo;
  visibility: boolean;
  closeModal: MouseEventHandler<HTMLButtonElement>;
}) => {
  const getUrl = (uidList: string[]) => {
    uidList.sort();
    return uidList.join("_");
  };

  return (
    <div
      className={`fixed left-[14rem] right-0 h-full bg-black/40 duration-75 ${
        visibility ? "visible opacity-100" : "invisible opacity-0"
      }`}
    >
      <div className="absolute right-1/2 bottom-1/2 translate-x-1/2 translate-y-1/2 aspect-[4/6] min-h-[16rem] h-3/5 flex flex-col bg-white">
        <CloseButton onClick={closeModal} />
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
      </div>
    </div>
  );
};

export default UserProfileModal;
