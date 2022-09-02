import Button from "../atoms/Button";
import Text from "../atoms/Text";
import Personnel from "../molecules/Personnel";

export interface ChattingRoomHeaderProps {
  title: string;
  groupPersonnel?: number;
  onPeopleClick?: Function;
}

const ChattingRoomHeader = ({ title, groupPersonnel, onPeopleClick }: ChattingRoomHeaderProps) => {
  return (
    <div className="w-full h-12 min-h-[3rem] bg-secondary flex items-center gap-2 p-2 border-b-4 border-rose-50">
      <div className="flex items-center">
        <Button btnType="backImage" />
        <Text size="lg">{title}</Text>
      </div>
      {groupPersonnel && <Personnel count={groupPersonnel} onClick={onPeopleClick} />}
    </div>
  );
};

export default ChattingRoomHeader;
