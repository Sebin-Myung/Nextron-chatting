import { useEffect, useRef, useState } from "react";
import tw from "tailwind-styled-components";
import { useAppDispatch, useAppSelector } from "../store/config";
import { MessageData } from "../store/slices/chattingDataSlice";
import { fetchUserInfo, UserInfo } from "../store/slices/userInfoSlice";
import { getTime } from "./OthersMessageBox";

interface ItemListProps {
  image?: string;
  title?: string;
  uid?: string;
  message?: MessageData;
  selectOption?: boolean;
  onClick?: Function;
  visibility?: boolean;
}

const ItemList = ({ image, title, uid, message, selectOption = false, onClick, visibility = false }: ItemListProps) => {
  const [itemUser, setItemUser] = useState<UserInfo>();
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const { userInfo, loading } = useAppSelector((state) => state.userInfo);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (uid) dispatch(fetchUserInfo(uid));
  }, []);

  useEffect(() => {
    setIsSelected(false);
  }, [visibility]);

  useEffect(() => {
    if (uid) setItemUser(userInfo[uid]);
  }, [userInfo]);

  const onListClick = () => {
    onClick();
    if (selectOption) setIsSelected(!isSelected);
  };

  if (loading === "idle" && uid) return;

  return (
    itemUser && (
      <li className="w-full max-h-20 h-full" onClick={onListClick}>
        <div className="flex justify-between w-full h-full">
          <div className="flex justify-start gap-3 h-full" style={{ width: "calc(100% - 8rem)" }}>
            <div className="avatar w-fit h-full">
              <div className="w-fit h-full rounded-full">
                <img
                  src={
                    image || (itemUser.profileImage === "" ? "/images/defaultProfileImage.png" : itemUser.profileImage)
                  }
                  className="object-cover"
                />
              </div>
            </div>
            <div className="flex flex-col justify-center w-full shrink-[2]">
              <p className="font-semibold">{title || itemUser.nickname}</p>
              {message && <p className="text-xs truncate">{message.message}</p>}
            </div>
          </div>
          {message && <p>{getTime(message.timestamp)}</p>}
          {selectOption && (
            <input
              type="checkbox"
              checked={isSelected}
              className="checkbox checkbox-secondary"
              onChange={() => {
                setIsSelected(!isSelected);
              }}
            />
          )}
        </div>
      </li>
    )
  );
};

export const ItemListWrapper = tw.ul`
menu
w-full
h-screen
overflow-y-auto
`;

export default ItemList;
