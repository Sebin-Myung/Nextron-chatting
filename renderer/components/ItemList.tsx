import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { BsPerson } from "react-icons/bs";
import tw from "tailwind-styled-components";
import { GroupChattingData, MessageData } from "../config/chattingData";
import { getTime } from "../functions/dateFunctions";
import { db } from "../pages/_app";
import { useAppDispatch, useAppSelector } from "../store/config";
import { fetchUserInfo, UserInfo } from "../store/slices/userInfoSlice";

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
  const [groupChattingDataLoading, setGroupChattingDataLoading] = useState<boolean>(true);
  const { userInfo, loading: userInfoLoading } = useAppSelector((state) => state.userInfo);
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

  const getTimeInterval = (timestamp: number) => {
    const currentTimestamp = Date.now();
    const currentTime = new Date(currentTimestamp);
    const recordTime = new Date(timestamp);
    const currentYear = currentTime.getFullYear();
    const [recordYear, recordMonth, recordDate] = [
      recordTime.getFullYear(),
      recordTime.getMonth(),
      recordTime.getDate(),
    ];

    if (currentTimestamp - timestamp < 86400000) {
      return getTime(recordTime);
    } else if (currentTimestamp - timestamp < 86400000 * 2) {
      return "??????";
    } else if (currentYear === recordYear) {
      return `${recordMonth + 1}??? ${recordDate}???`;
    } else {
      return `${recordYear}. ${recordMonth + 1}. ${recordDate}`;
    }
  };

  useEffect(() => {
    if (isPersonalChatting(itemProps)) dispatch(fetchUserInfo(itemProps.uid));
    else {
      const getGroupChattingData = async (groupId: string) => {
        const groupChattingRef = doc(db, "groupChatting", groupId);
        const groupChattingSnap = await getDoc(groupChattingRef);
        setGroupData(() => groupChattingSnap.data() as GroupChattingData);
      };
      getGroupChattingData(itemProps.groupId).then(() => setGroupChattingDataLoading(false));
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
    if (onClick) onClick();
    if (selectOption) setIsSelected(!isSelected);
  };

  if (userInfoLoading === "idle" && groupChattingDataLoading) return;

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
              <div className="flex items-center">
                <p className="font-semibold truncate">{value.titleProp}</p>
                {groupData && (
                  <div className="flex items-center ml-2 cursor-pointer">
                    <BsPerson />
                    <p>{groupData.users.length}</p>
                  </div>
                )}
              </div>
              {message && <p className="text-xs truncate">{message.message}</p>}
            </div>
          </div>
          {message && <p className="text-xs">{getTimeInterval(message.timestamp)}</p>}
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
