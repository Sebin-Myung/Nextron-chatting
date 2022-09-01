import Image from "../atoms/Image";
import Input from "../atoms/Input";
import Text from "../atoms/Text";
import Personnel from "./Personnel";

export interface UserListData {
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
  isChecked: boolean;
  onCheckboxChange: Function;
}

export interface UserListItemProps {
  data: UserListData | ChattingRoomListData | CheckBoxListData;
  onClick: Function;
}

const instanceOfChattingRoomListData = (object: any): object is ChattingRoomListData => {
  return "message" in object;
};
const instanceOfCheckBoxListData = (object: any): object is CheckBoxListData => {
  return "checkOption" in object;
};

const UserListItem = ({ data, onClick }: UserListItemProps) => {
  return (
    <li className="w-full max-h-20 h-full" onClick={() => onClick()}>
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
        {instanceOfCheckBoxListData(data) && (
          <Input type="checkbox" isChecked={data.isChecked} onChange={data.onCheckboxChange} />
        )}
      </div>
    </li>
  );
};

export default UserListItem;
