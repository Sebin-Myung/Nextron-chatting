import Router from "next/router";
import { BsArrowLeft } from "react-icons/bs";

interface ChattingRoomHeaderProps {
  title: string;
}

const ChattingRoomHeader = ({ title }: ChattingRoomHeaderProps) => {
  return (
    <div className="w-full h-12 min-h-[3rem] bg-secondary flex items-center p-2 border-b-4 border-rose-50">
      <BsArrowLeft className="w-8 h-8 p-2 cursor-pointer" onClick={() => Router.back()} />
      <p className="text-lg ml-2">{title}</p>
    </div>
  );
};

export default ChattingRoomHeader;
