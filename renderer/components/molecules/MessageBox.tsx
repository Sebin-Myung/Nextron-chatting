import Text from "../atoms/Text"
import SpeechBubble from "../atoms/SpeechBubble"

interface MessageBoxProps {
  type: "me" | "others"
  nickname?: string
  message: string
  time: string
}

const MessageBox = ({type, nickname, message, time}: MessageBoxProps) => {
  if(type === "me") {
    return (
      <div className="flex items-end gap-1 max-w-[80%]">
        <Text size="xs">{time}</Text>
        <SpeechBubble type={type}>{message}</SpeechBubble>
      </div>
    )
  } else if(type === "others") {
    return (
      <div className="flex items-end gap-1 max-w-[80%]">
        <div>
          <Text size="sm">{nickname}</Text>
          <SpeechBubble type={type}>{message}</SpeechBubble>
        </div>
        <Text size="xs">{time}</Text>
      </div>
    )
  }
}

export default MessageBox