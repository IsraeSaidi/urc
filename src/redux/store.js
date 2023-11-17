import {configureStore, createSlice } from "@reduxjs/toolkit"

const comSlice = createSlice({
    name: "Com",
    initialState: {
        question: "",
        reponse: ""
    },
    reducers: {
    sendQuestion: (state, action) => {
        state.question = action.paylod
    },
    sendResponse: (state, action) => {
        state.reponse = action.paylod
    }
}
})

export const mainStore = configureStore({
    reducer: {
        Com: comSlice.reducer
    }
})