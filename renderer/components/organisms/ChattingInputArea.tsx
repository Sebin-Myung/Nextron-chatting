import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { useRef } from "react";
import { MessageData } from "../../config/chattingData";
import { db } from "../../pages/_app";
import { useAppDispatch } from "../../store/config";
import { setAlertWithTimeOut } from "../../store/slices/alertDataSlice";
import Button from "../atoms/Button";
import Textarea from "../atoms/Textarea";

export interface ChattingInputAreaProps {
  category: "personalChatting" | "groupChatting";
  currentUserUid: string;
  url: string;
  users?: string[];
}

const ChattingInputArea = ({ category, currentUserUid, url, users }: ChattingInputAreaProps) => {
  const inputMessage = useRef<HTMLTextAreaElement>(null);
  const dispatch = useAppDispatch();

  const sendPersonalChattingMessage = async (messageData: MessageData) => {
    const chattingRef = doc(db, "chatting", url);
    const chattingSnap = await getDoc(chattingRef);
    if (chattingSnap.exists()) {
      await updateDoc(chattingRef, {
        messages: arrayUnion(messageData),
        lastMessage: messageData,
      });
    } else {
      await setDoc(chattingRef, {
        url: url,
        users: url.split("_"),
        messages: [messageData],
        lastMessage: messageData,
      });
    }
  };

  const sendGroupChattingMessage = async (messageData: MessageData) => {
    const groupChattingRef = doc(db, "groupChatting", url);
    const groupChattingSnap = await getDoc(groupChattingRef);
    if (groupChattingSnap.exists()) {
      await updateDoc(groupChattingRef, {
        messages: arrayUnion(messageData),
        lastMessage: messageData,
      });
    } else {
      await setDoc(groupChattingRef, {
        roomTitle: url,
        roomProfileImage: "",
        url: url,
        users: users,
        messages: [messageData],
        lastMessage: messageData,
      });
      await updateDoc(doc(db, "infos", "counts"), {
        groupChattingCount: Number(url.slice(5)),
      });
    }
  };

  const sendMessage = async () => {
    const messageData: MessageData = {
      uid: currentUserUid,
      timestamp: Date.now(),
      message: inputMessage.current.value,
    };

    if (category === "personalChatting") {
      sendPersonalChattingMessage(messageData)
        .then(() => {
          inputMessage.current.value = "";
        })
        .catch((error) => {
          console.log(error);
          setAlertWithTimeOut(dispatch, "메세지 전송에 실패하였습니다.");
        });
    } else if (category === "groupChatting") {
      sendGroupChattingMessage(messageData)
        .then(() => {
          inputMessage.current.value = "";
        })
        .catch((error) => {
          console.log(error);
          setAlertWithTimeOut(dispatch, "메세지 전송에 실패하였습니다.");
        });
    }
  };
  return (
    <div className="w-full h-36 min-h-[9rem] bg-rose-100 p-2 flex items-center gap-2">
      <Textarea ref={inputMessage} />
      <Button color="secondary" onClick={sendMessage}>
        전송하기
      </Button>
    </div>
  );
};

export default ChattingInputArea;
