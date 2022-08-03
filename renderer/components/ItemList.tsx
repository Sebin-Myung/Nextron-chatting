import { useEffect, useState } from "react";
import tw from "tailwind-styled-components";
import { useAppDispatch, useAppSelector } from "../store/config";
import { MessageData } from "../store/slices/chattingDataSlice";
import { fetchGroupChattingData, GroupChattingData } from "../store/slices/groupChattingDataSlice";
import { fetchUserInfo, UserInfo } from "../store/slices/userInfoSlice";
import { getTime } from "./OthersMessageBox";

interface PersonalChattingProps {
  uid: string;
}

interface GroupChattingProps {
  groupId: string;
}

interface ItemListProps {
  itemProps: PersonalChattingProps | GroupChattingProps;
  message?: MessageData;
  selectOption?: boolean;
  onClick?: Function;
  visibility?: boolean;
}

const ItemList = ({ itemProps, message, selectOption = false, onClick, visibility = false }: ItemListProps) => {
  const [value, setValue] = useState<{ imageProp: string; titleProp: string }>();
  const [itemUser, setItemUser] = useState<UserInfo>();
  const [groupData, setGroupData] = useState<GroupChattingData>();
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const { userInfo, loading: userInfoLoading } = useAppSelector((state) => state.userInfo);
  const { groupChattingData, loading: groupChattingDataLoading } = useAppSelector((state) => state.groupChattingData);
  const dispatch = useAppDispatch();

  const isPersonalChatting = (itemProps: any): itemProps is PersonalChattingProps => {
    return itemProps.uid !== undefined;
  };

  const getProps = () => {
    if (isPersonalChatting(itemProps)) {
      setValue({ imageProp: itemUser?.profileImage, titleProp: itemUser?.nickname });
    } else {
      setValue({ imageProp: groupData?.roomProfileImage, titleProp: groupData?.roomTitle });
    }
  };

  useEffect(() => {
    if (isPersonalChatting(itemProps)) dispatch(fetchUserInfo(itemProps.uid));
    else {
      dispatch(fetchGroupChattingData(itemProps.groupId)).then(({ payload }) => {
        setGroupData(() => payload as GroupChattingData);
      });
    }
  }, []);

  useEffect(() => {
    setIsSelected(false);
  }, [visibility]);

  useEffect(() => {
    if (isPersonalChatting(itemProps)) setItemUser(userInfo[itemProps.uid]);
  }, [userInfo]);

  useEffect(() => {
    getProps();
  }, [itemUser, groupData]);

  const onListClick = () => {
    onClick();
    if (selectOption) setIsSelected(!isSelected);
  };

  if (userInfoLoading === "idle" && groupChattingDataLoading === "idle") return;

  return (
    value && (
      <li className="w-full max-h-20 h-full" onClick={onListClick}>
        <div className="flex justify-between w-full min-w-[18rem] h-full">
          <div className="flex justify-start gap-3 h-full" style={{ width: "calc(100% - 8rem)" }}>
            <div className="avatar aspect-square h-full">
              <div className="w-fit h-full rounded-full border">
                <img
                  src={value.imageProp === "" ? "/images/defaultProfileImage.png" : value.imageProp}
                  className="object-cover"
                />
              </div>
            </div>
            <div className="flex flex-col justify-center w-10/12 shrink-[2]">
              <p className="font-semibold">{value.titleProp}</p>
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
