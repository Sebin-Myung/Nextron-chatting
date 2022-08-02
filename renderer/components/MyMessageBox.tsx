import tw from "tailwind-styled-components";
import { getTime } from "./OthersMessageBox";

const MyMessageBox = ({ message, timestamp }: { message: string; timestamp: number }) => {
  return (
    <div className="flex justify-end">
      <p className="text-xs self-end mr-1">{getTime(timestamp)}</p>
      <MyMessageBoxWrapper>{message}</MyMessageBoxWrapper>
    </div>
  );
};

const MyMessageBoxWrapper = tw.div`
relative
bg-white
mt-2
mr-4
px-4
py-2
w-fit
max-w-[70%]
rounded-xl
self-end
after:absolute
after:content-['']
after:border-[1rem]
after:border-transparent
after:border-t-white
after:border-l-white
after:top-0
after:right-0
after:translate-x-4`;

export default MyMessageBox;
