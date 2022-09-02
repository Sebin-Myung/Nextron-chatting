import { BsEmojiSunglasses } from "react-icons/bs";
import Text from "../atoms/Text";

const NoChattingRooms = () => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-2 bg-rose-50">
      <BsEmojiSunglasses className="w-fit h-12 fill-secondary-content" />
      <Text size="xl" color="secondary" bold="bold">
        대화를 시작해보세요
      </Text>
    </div>
  );
};

export default NoChattingRooms;
