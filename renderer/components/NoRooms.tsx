import { BsEmojiSunglasses } from "react-icons/bs";

const NoRooms = () => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-2 bg-rose-50">
      <BsEmojiSunglasses className="w-fit h-12 fill-secondary-content" />
      <p className="text-xl font-bold text-secondary-content">대화를 시작해보세요</p>
    </div>
  );
};

export default NoRooms;
