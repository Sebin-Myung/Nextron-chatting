import { Unsubscribe } from "firebase/firestore";
import Router from "next/router";
import { BsArrowLeft, BsPerson } from "react-icons/bs";

interface ChattingRoomHeaderProps {
  title: string;
  stopListening: Unsubscribe;
  people?: number;
  onPeopleClick?: Function;
}

const ChattingRoomHeader = ({ title, stopListening, people, onPeopleClick }: ChattingRoomHeaderProps) => {
  return (
    <div className="w-full h-12 min-h-[3rem] bg-secondary flex items-center p-2 border-b-4 border-rose-50">
      <BsArrowLeft
        className="w-8 h-8 p-2 cursor-pointer"
        onClick={() => {
          Router.back();
          stopListening();
        }}
      />
      <p className="text-lg ml-2">{title}</p>
      {people && (
        <div className="flex items-center ml-2 cursor-pointer" onClick={() => onPeopleClick()}>
          <BsPerson />
          <p>{people}</p>
        </div>
      )}
    </div>
  );
};

export default ChattingRoomHeader;
