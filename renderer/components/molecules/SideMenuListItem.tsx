import Link from "next/link"

interface SideMenuListItemProps {
  isSelected: boolean
  link: string
  icon: JSX.Element
  selectedIcon: JSX.Element
  title: string
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