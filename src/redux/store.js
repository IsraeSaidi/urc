// store.js
import { configureStore, createSlice } from "@reduxjs/toolkit";

const comSlice = createSlice({
  name: "Com",
  initialState: {
    question: "",
    reponse: "",
    messages: [],
  },
  reducers: {
    sendQuestion: (state, action) => {
      state.question = action.payload;
    },
    sendResponse: (state, action) => {
      state.reponse = action.payload;
    },
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
  },
});

export const { sendQuestion, sendResponse, setMessages } = comSlice.actions;

export const mainStore = configureStore({
  reducer: {
    Com: comSlice.reducer,
  },
});
