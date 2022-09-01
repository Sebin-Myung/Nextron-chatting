import Link from "next/link"

export interface SideMenuData {
  link: "/main" | "/chatting" | "/groupChatting"
  title: string
  icon: JSX.Element
  selectedIcon: JSX.Element
}

interface SideMenuListItemProps extends SideMenuData {
  isSelected: boolean
}

const SideMenuListItem = ({isSelected, link, icon, selectedIcon, title}: SideMenuListItemProps) => {
  return (
    <li className={`${isSelected && "border-l-4 border-primary-focus"}`}>
      <Link href={link}>
        <div>
          {isSelected ? selectedIcon : icon}
          {title}
        </div>
      </Link>
    </li>
  )
}

export default SideMenuListItem