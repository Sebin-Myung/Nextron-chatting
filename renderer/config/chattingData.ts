export interface MessageData {
  uid: string;
  timestamp: number;
  message: string;
}

export interface ChattingData {
  url: string;
  users: string[];
  messages: MessageData[];
  lastMessage: MessageData;
}

export interface GroupChattingData extends ChattingData {
  roomTitle: string;
  roomProfileImage: string;
}
