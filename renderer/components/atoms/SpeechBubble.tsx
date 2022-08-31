import tw from "tailwind-styled-components";

const SpeechBubble = ({type, children}: {type: "me" | "others", children: string}) => {
  if(type === "me") {
     return <MyMessageBoxWrapper>{children}</MyMessageBoxWrapper>
  } else if(type === "others") {
    return <OthersMessageBoxWrapper>{children}</OthersMessageBoxWrapper>
  }
}

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

export default SpeechBubble