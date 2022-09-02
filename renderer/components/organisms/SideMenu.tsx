import { getAuth } from "firebase/auth";
import Router from "next/router";
import { BsPerson, BsPersonFill } from "react-icons/bs";
import {
  IoChatbubbleEllipsesOutline,
  IoChatbubbleEllipsesSharp,
  IoChatbubblesOutline,
  IoChatbubblesSharp,
} from "react-icons/io5";
import Button from "../atoms/Button";
import { SideMenuData } from "../molecules/SideMenuListItem";
import SideMenuList from "./SideMenuList";

const SideMenu = ({
  category,
  children,
}: {
  category: "main" | "chatting" | "groupChatting";
  children: JSX.Element;
}) => {
  const sideMenuDatas: SideMenuData[] = [
    {
      link: "/main",
      title: "유저 목록",
      icon: <BsPerson />,
      selectedIcon: <BsPersonFill />,
    },
    {
      link: "/chatting",
      title: "1:1 채팅",
      icon: <IoChatbubbleEllipsesOutline />,
      selectedIcon: <IoChatbubbleEllipsesSharp />,
    },
    {
      link: "/groupChatting",
      title: "그룹 채팅",
      icon: <IoChatbubblesOutline />,
      selectedIcon: <IoChatbubblesSharp />,
    },
  ];

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
    <div className="flex min-w-[512px] max-w-screen">
      <nav className="flex flex-col justify-between bg-primary w-56 h-screen px-2 py-4">
        <SideMenuList sideMenuDatas={sideMenuDatas} currentCategory={category} />
        <Button fullWidth size="medium" color="primary" focus textSize="xs" onClick={logout}>
          로그아웃
        </Button>
      </nav>
      <div className="w-full h-screen shrink-0" style={{ width: "calc(100vw - 14rem)" }}>
        {children}
      </div>
    </div>
  );
};

export default SideMenu;
