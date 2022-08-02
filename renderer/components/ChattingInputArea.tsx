import { useRef } from "react";

const ChattingInputArea = () => {
  const inputMessage = useRef<HTMLTextAreaElement>();

  const sendMessage = () => {
    console.log(inputMessage.current.value);
    inputMessage.current.value = "";
  };

  return (
    <div className="w-full h-36 min-h-[9rem] bg-rose-100 p-2 flex gap-2">
      <textarea
        ref={inputMessage}
        className="grow h-full bg-white rounded-xl text-start resize-none overflow-y-auto p-2"
      />
      <button className="btn btn-secondary my-auto" onClick={sendMessage}>
        전송하기
      </button>
    </div>
  );
};

export default ChattingInputArea;
