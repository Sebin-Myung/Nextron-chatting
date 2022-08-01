import { MouseEventHandler } from "react";
import { BsXLg } from "react-icons/bs";

const CloseButton = ({ onClick }: { onClick: MouseEventHandler<HTMLButtonElement> }) => {
  return (
    <button className="btn btn-circle btn-outline absolute right-0 m-2 w-8 h-8 min-h-[2rem]" onClick={onClick}>
      <BsXLg />
    </button>
  );
};

export default CloseButton;
