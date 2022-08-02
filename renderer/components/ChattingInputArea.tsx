import { setDoc, doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { useRef } from "react";
import { db } from "../pages/_app";
import { useAppDispatch } from "../store/config";
import { setAlertWithTimeOut } from "../store/slices/alertDataSlice";
import { fetchChattingData, MessageData } from "../store/slices/chattingDataSlice";

const ChattingInputArea = ({ currentUserUid, uid_uid }: { currentUserUid: string; uid_uid: string }) => {
  const inputMessage = useRef<HTMLTextAreaElement>();
  const dispatch = useAppDispatch();

  const sendMessage = async () => {
    const messageData: MessageData = {
      uid: currentUserUid,
      timestamp: Date.now(),
      message: inputMessage.current.value,
    };

    const chattingRef = doc(db, "chatting", uid_uid);
    const chattingSnap = await getDoc(chattingRef);
    if (chattingSnap.exists()) {
      await updateDoc(chattingRef, {
        messages: arrayUnion(messageData),
        lastMessage: messageData,
      })
        .then(() => {
          inputMessage.current.value = "";
          dispatch(fetchChattingData(uid_uid));
        })
        .catch((error) => {
          console.log(error);
          setAlertWithTimeOut(dispatch, "메세지 전송에 실패하였습니다.");
        });
    } else {
      await setDoc(chattingRef, {
        users: uid_uid.split("_"),
        messages: [messageData],
        lastMessage: messageData,
      })
        .then(() => {
          inputMessage.current.value = "";
          dispatch(fetchChattingData(uid_uid));
        })
        .catch((error) => {
          console.log(error);
          setAlertWithTimeOut(dispatch, "메세지 전송에 실패하였습니다.");
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
        전송하기
      </button>
    </div>
  );
};

export default ChattingInputArea;
