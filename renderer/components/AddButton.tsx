import { MouseEventHandler } from "react";
import { BsPlusLg } from "react-icons/bs";

const AddButton = ({ onClick }: { onClick: MouseEventHandler<HTMLButtonElement> }) => {
  return (
    <button className="fixed right-0 bottom-0 btn btn-secondary btn-circle m-4" onClick={onClick}>
      <BsPlusLg />
    </button>
  );
};

export default AddButton;
