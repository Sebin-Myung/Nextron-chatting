import { useEffect, useState } from "react";
import Image from "../atoms/Image";
import Input from "../atoms/Input";
import Text from "../atoms/Text";
import Personnel from "./Personnel";

export interface UserListData {
  uid?: string;
  image: string;
  title: string;
}

interface ChattingRoomListData extends UserListData {
  message: string;
  date: string;
  groupPersonnel?: number;
}

interface CheckBoxListData extends UserListData {
  checkOption: true;
}

export interface UserListItemProps {
  visibility?: boolean;
  data: UserListData | ChattingRoomListData | CheckBoxListData;
  onClick: Function;
}

const instanceOfChattingRoomListData = (object: any): object is ChattingRoomListData => {
  return "message" in object;
};
export const instanceOfCheckBoxListData = (object: any): object is CheckBoxListData => {
  return "checkOption" in object;
};

const UserListItem = ({ visibility, data, onClick }: UserListItemProps) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  useEffect(() => {
    setIsChecked(false);
  }, [visibility]);

  const onListClick = () => {
    setIsChecked(!isChecked);
    onClick();
  };

  return (
    <li className="w-full max-h-20 h-full" onClick={instanceOfCheckBoxListData(data) ? onListClick : () => onClick()}>
      <div className="flex justify-between w-full min-w-[18rem] h-full">
        <div className="flex justify-start gap-3 h-full" style={{ width: "calc(100% - 8rem)" }}>
          <Image type="circle" src={data.image} />
          <div className="flex flex-col justify-center w-10/12 shrink-[2]">
            <div className="flex items-center gap-2">
              <Text bold="semibold" truncate>
                {data.title}
              </Text>
              {instanceOfChattingRoomListData(data) && <Personnel count={data.groupPersonnel} />}
            </div>
            {instanceOfChattingRoomListData(data) && (
              <Text size="xs" truncate>
                {data.message}
              </Text>
            )}
          </div>
        </div>
        {instanceOfChattingRoomListData(data) && <Text size="xs">{data.date}</Text>}
        {instanceOfCheckBoxListData(data) && data.checkOption && (
          <Input type="checkbox" isChecked={isChecked} onChange={() => setIsChecked(!isChecked)} />
        )}
      </div>
    </li>
  );
};

export default UserListItem;
