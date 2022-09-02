import Divider from "../atoms/Divider";
import UserListItem, { instanceOfCheckBoxListData, UserListData, UserListItemProps } from "../molecules/UserListItem";

interface UserListProps {
  currentUserUid?: string;
  visibility?: boolean;
  checkOption?: boolean;
  myProfile?: boolean;
  myData?: UserListData;
  userListItemDatas: UserListItemProps[];
}

const UserList = ({
  currentUserUid,
  visibility,
  checkOption = false,
  myProfile,
  myData,
  userListItemDatas,
}: UserListProps) => {
  const userItemDatas = checkOption
    ? userListItemDatas.filter((data) => data.data.uid !== currentUserUid)
    : userListItemDatas;
  return (
    <ul className="menu w-full h-screen overflow-y-auto">
      {myProfile && (
        <>
          <UserListItem visibility={visibility} data={myData} onClick={() => {}} />
          <Divider />
        </>
      )}
      {userItemDatas.map((data) => (
        <UserListItem
          key={data.data.title}
          visibility={visibility}
          data={data.data}
          onClick={instanceOfCheckBoxListData(data.data) ? () => data.onClick(data.data?.uid) : data.onClick}
        />
      ))}
    </ul>
  );
};

export default UserList;
