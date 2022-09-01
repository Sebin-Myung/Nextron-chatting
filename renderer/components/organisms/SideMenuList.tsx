import SideMenuListItem, { SideMenuData } from "../molecules/SideMenuListItem";

const SideMenuList = ({
  sideMenuDatas,
  currentCategory,
}: {
  sideMenuDatas: SideMenuData[];
  currentCategory: string;
}) => {
  return (
    <ul className="menu menu-compact gap-1 lg:menu-normal w-56 p-2 pt-4">
      {sideMenuDatas.map((data) => (
        <SideMenuListItem
          key={data.link}
          isSelected={data.link === "/" + currentCategory}
          link={data.link}
          title={data.title}
          icon={data.icon}
          selectedIcon={data.selectedIcon}
        />
      ))}
    </ul>
  );
};

export default SideMenuList;