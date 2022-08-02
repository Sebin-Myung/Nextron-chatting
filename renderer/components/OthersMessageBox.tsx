import tw from "tailwind-styled-components";

interface OthersMessageBoxProps {
  message: string;
  nickname: string;
  timestamp: number;
}

export const getTime = (timestamp: number) => {
  const date = new Date(timestamp);
  const hour = date.getHours();
  const minute = date.getMinutes();
  const resultHour = hour < 10 ? "0" + hour : hour.toString();
  const resultMinute = minute < 10 ? "0" + minute : minute.toString();
  return resultHour + ":" + resultMinute;
};

const OthersMessageBox = ({ message, nickname, timestamp }: OthersMessageBoxProps) => {
  return (
    <div className="flex w-full">
      <div className="max-w-[70%]">
        <p className="h-4 text-sm">{nickname}</p>
        <OthersMessageBoxWrapper>{message}</OthersMessageBoxWrapper>
      </div>
      <p className="text-xs self-end ml-1">{getTime(timestamp)}</p>
    </div>
  );
};

const OthersMessageBoxWrapper = tw.div`
relative
bg-secondary
mt-2
ml-4
px-4
py-2
w-fit
rounded-xl
after:absolute
after:content-['']
after:border-[1rem]
after:border-transparent
after:border-t-secondary
after:border-r-secondary
after:top-0
after:left-0
after:translate-x-[-1rem]`;

export default OthersMessageBox;
