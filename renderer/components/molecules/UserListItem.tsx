import Image from "../atoms/Image"
import Input from "../atoms/Input"
import Text from "../atoms/Text"
import Personnel from "./Personnel"

interface UserListItemProps {
  image: string
  title: string
  message?: string
  date?: string
  groupPersonnel?: number
  checkOption?: boolean
  isChecked?: boolean
  onCheckboxChange?: Function
  onClick: Function
}

const UserListItem = ({image, title, message, date, groupPersonnel, checkOption = false, isChecked, onCheckboxChange, onClick}: UserListItemProps) => {
  return (
    <li className="w-full max-h-20 h-full" onClick={() => onClick()}>
      <div className="flex justify-between w-full min-w-[18rem] h-full">
        <div className="flex justify-start gap-3 h-full" style={{ width: "calc(100% - 8rem)" }}>
          <Image type="circle" src={image}/>
          <div className="flex flex-col justify-center w-10/12 shrink-[2]">
            <div className="flex items-center gap-2">
              <Text bold="semibold" truncate>{title}</Text>
              {groupPersonnel && <Personnel count={groupPersonnel} />}
            </div>
            {message && <Text size="xs" truncate>{message}</Text>}
          </div>
        </div>
        {date && <Text size="xs">{date}</Text>}
        {checkOption && (
          <Input type="checkbox" isChecked={isChecked} onChange={onCheckboxChange}/>
        )}
      </div>
    </li>
  )
}

export default UserListItem