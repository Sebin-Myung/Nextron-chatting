import Router from "next/router";
import { BsArrowLeft } from "react-icons/bs";

const BackButton = () => {
  return (
    <button
      className="btn btn-circle btn-outline btn-primary absolute w-10 h-10 min-h-[2.5rem]"
      onClick={() => Router.back()}
    >
      <BsArrowLeft />
    </button>
  );
};

export default BackButton;
