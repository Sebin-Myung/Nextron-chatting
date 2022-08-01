import { MouseEventHandler } from "react";
import tw from "tailwind-styled-components";
import { UserInfo } from "../store/slices/userInfoSlice";

interface ItemListProps {
  user: UserInfo;
  onClick?: MouseEventHandler<HTMLLIElement>;
}

const ItemList = ({ user, onClick }: ItemListProps) => {
  return (
    <li className="w-full max-h-20 h-full" onClick={onClick}>
      <div className="flex justify-between w-full h-full">
        <div className="flex justify-start gap-3 h-full" style={{ width: "calc(100% - 8rem)" }}>
          <div className="avatar w-fit h-full">
            <div className="w-fit h-full rounded-full">
              <img
                src={user.profileImage === "" ? "/images/defaultProfileImage.png" : user.profileImage}
                className="object-cover"
              />
            </div>
          </div>
          <div className="flex flex-col justify-center w-full shrink-[2]">
            <p className="font-semibold">{user.nickname}</p>
          </div>
        </div>
      </div>
    </li>
  );
};

export const ItemListWrapper = tw.ul`
menu
w-full
h-screen
overflow-y-auto
`;

export default ItemList;
