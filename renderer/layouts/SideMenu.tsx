import { getAuth } from "firebase/auth";
import Link from "next/link";
import Router from "next/router";
import { BsPerson, BsPersonFill } from "react-icons/bs";
import {
  IoChatbubbleEllipsesOutline,
  IoChatbubbleEllipsesSharp,
  IoChatbubblesOutline,
  IoChatbubblesSharp,
} from "react-icons/io5";

const SideMenu = ({
  category,
  children,
}: {
  category: "userList" | "chatting" | "groupChatting";
  children: JSX.Element;
}) => {
  const logout = () => {
    getAuth()
      .signOut()
      .then(() => {
        localStorage.removeItem("currentUser");
        Router.push("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="flex max-w-screen overflow-hidden">
      <nav className="flex flex-col justify-between bg-primary h-screen">
        <ul className="menu menu-compact gap-1 lg:menu-normal w-56 p-2 pt-4">
          <li className={`${category === "userList" && "border-l-4 border-primary-focus"}`}>
            <Link href="/main">
              <div>
                {category === "userList" ? <BsPersonFill /> : <BsPerson />}
                유저 목록
              </div>
            </Link>
          </li>
          <li className={`${category === "chatting" && "border-l-4 border-primary-focus"}`}>
            <Link href="/chatting">
              <div>
                {category === "chatting" ? <IoChatbubbleEllipsesSharp /> : <IoChatbubbleEllipsesOutline />}
                1:1 채팅
              </div>
            </Link>
          </li>
          <li className={`${category === "groupChatting" && "border-l-4 border-primary-focus"}`}>
            <Link href="/groupChatting">
              <div>
                {category === "groupChatting" ? <IoChatbubblesSharp /> : <IoChatbubblesOutline />}
                그룹 채팅
              </div>
            </Link>
          </li>
        </ul>
        <button
          className="btn btn-primary bg-primary-focus w-[13rem] min-h-8 h-8 lg:h-12 text-xs mx-2 mb-4"
          onClick={logout}
        >
          로그아웃
        </button>
      </nav>
      <div className="w-full h-screen">{children}</div>
    </div>
  );
};

export default SideMenu;
