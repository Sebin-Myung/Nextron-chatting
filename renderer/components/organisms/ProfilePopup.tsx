import Router from "next/router";
import { UserInfo } from "../../store/slices/userInfoSlice";
import Image from "../atoms/Image";
import Button from "../atoms/Button";
import Text from "../atoms/Text";
import PopupArea from "./PopupArea";

interface ProfilePopupProps {
  currentUser: UserInfo;
  user: UserInfo;
  visibility: boolean;
  closeModal: Function;
}

const ProfilePopup = ({ currentUser, user, visibility, closeModal }: ProfilePopupProps) => {
  const getUrl = (uidList: string[]) => {
    uidList.sort();
    return uidList.join("_");
  };

  return (
    <PopupArea visibility={visibility} closeButtonClick={closeModal}>
      <>
        <div className="w-full aspect-square p-4">
          <Image type="square" src={user.profileImage === "" ? "/images/defaultProfileImage.png" : user.profileImage} />
        </div>
        <div className="flex flex-col h-full justify-between items-center pb-8">
          <Text size="lg" bold="bold">
            {user.nickname}
          </Text>
          <Button
            size="medium"
            onClick={() => {
              Router.push(`/chatting/${getUrl([currentUser.uid, user.uid])}`);
            }}
          >
            채팅하기
          </Button>
        </div>
      </>
    </PopupArea>
  );
};

export default ProfilePopup;
