import { UserInfo } from "../store/slices/userListSlice";

const ItemList = ({ user }: { user: UserInfo }) => {
  return (
    <li className="max-h-20 h-full">
      <div className="flex justify-start h-full">
        <div className="avatar w-fit h-full">
          <div className="w-fit h-full rounded-full">
            <img src={user.profileImage === "" ? "/images/defaultProfileImage.png" : user.profileImage} />
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <p className="font-semibold">{user.nickname}</p>
        </div>
      </div>
    </li>
  );
};

export default ItemList;
