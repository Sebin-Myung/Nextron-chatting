import Divider from "../atoms/Divider";
import UserListItem, { UserListData, UserListItemProps } from "../molecules/UserListItem";

interface UserListProps {
  myProfile?: boolean;
  myData?: UserListData;
  userListItemDatas: UserListItemProps[];
}

const UserList = ({ myProfile, myData, userListItemDatas }: UserListProps) => {
  return (
    <ul className="menu w-full h-screen overflow-y-auto">
      {myProfile && (
        <>
          <UserListItem data={myData} onClick={() => {}} />
          <Divider />
        </>
      )}
      {userListItemDatas.map((data) => (
        <UserListItem key={data.data.title} data={data.data} onClick={data.onClick} />
      ))}
    </ul>
  );
};

export default UserList;
