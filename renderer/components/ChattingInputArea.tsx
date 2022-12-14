import { setDoc, doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { useRef } from "react";
import { MessageData } from "../config/chattingData";
import { db } from "../pages/_app";
import { useAppDispatch } from "../store/config";
import { setAlertWithTimeOut } from "../store/slices/alertDataSlice";

interface ChattingInputAreaProps {
  category: "personalChatting" | "groupChatting";
  currentUserUid: string;
  url: string;
  users?: string[];
}

const ChattingInputArea = ({ category, currentUserUid, url, users }: ChattingInputAreaProps) => {
  const inputMessage = useRef<HTMLTextAreaElement>();
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
          setAlertWithTimeOut(dispatch, "????????? ????????? ?????????????????????.");
        });
    } else if (category === "groupChatting") {
      sendGroupChattingMessage(messageData)
        .then(() => {
          inputMessage.current.value = "";
        })
        .catch((error) => {
          console.log(error);
          setAlertWithTimeOut(dispatch, "????????? ????????? ?????????????????????.");
        });
    }
  };

  return (
    <div className="w-full h-36 min-h-[9rem] bg-rose-100 p-2 flex gap-2">
      <textarea
        ref={inputMessage}
        className="grow h-full bg-white rounded-xl text-start resize-none overflow-y-auto p-2"
      />
      <button className="btn btn-secondary my-auto" onClick={sendMessage}>
        ????????????
      </button>
    </div>
  );
};

export default ChattingInputArea;
