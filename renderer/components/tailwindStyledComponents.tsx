import tw from "tailwind-styled-components";

export const Title = tw.p`
text-3xl
font-bold
mt-4
mb-5
`;

export const Warning = tw.p`
text-error
text-xs
self-start
mt-1
ml-4
`;

export const ChattingRoomArea = tw.div`
w-full
h-screen
flex
flex-col
`;

export const ChattingMessageArea = tw.div`
grow
w-full
bg-rose-50
p-2
overflow-y-auto
flex
flex-col-reverse
`;

export const ChattingNoticeBox = tw.div`
bg-secondary
rounded-full
w-fit
text-sm
text-secondary-content
mx-auto
px-4
py-1
`;
