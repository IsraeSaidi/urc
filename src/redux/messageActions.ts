import { Message } from "../model/common";

export const setMessages = (messages: Message[]) => ({
    type: 'SET_MESSAGES',
    payload: messages,
  });
  