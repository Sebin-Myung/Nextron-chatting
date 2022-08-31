import { BsPerson } from "react-icons/bs"

interface PersonnelProps {
  count: number
  onClick?: Function
}

const Personnel = ({count, onClick}: PersonnelProps) => {
  if(onClick) {
    return (
      <div className="flex items-center cursor-pointer" onClick={() => onClick()}>
        <BsPerson />
        <p>{count}</p>
      </div>
    )
  } else {
    return (
      <div className="flex items-center">
        <BsPerson />
        <p>{count}</p>
      </div>
    )
  }
}

export default Personnel

{/* <div className="flex items-center ml-2 cursor-pointer">
  <BsPerson />
  <p>{groupData.users.length}</p>
</div> */}

{/* <div className="flex items-center ml-2 cursor-pointer" onClick={() => onPeopleClick()}>
  <BsPerson />
  <p>{people}</p>
</div> */}