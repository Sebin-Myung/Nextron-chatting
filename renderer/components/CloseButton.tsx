import { BsXLg } from "react-icons/bs";

const CloseButton = ({ onClick }: { onClick: Function }) => {
  return (
    <button
      className="btn btn-circle btn-outline absolute top-[-2.5rem] right-[-2.5rem] m-2 w-8 h-8 min-h-[2rem]"
      onClick={() => onClick()}
    >
      <BsXLg />
    </button>
  );
};

export default CloseButton;
