import { Message } from "../model/common";

const initialState: Message[] = [];

const messageReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'SET_MESSAGES':
      return action.payload;
    default:
      return state;
  }
}